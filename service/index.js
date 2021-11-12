require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const getProfile = user_id => {
  return pool
    .connect()
    .then(client => {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .catch(err => {
      client.release();
      return null;
    });
};

const putEditProfile = (user_id, first_name, last_name, age, snack, animal_type, thumbnail) => {
  if (!age) {
    age = 0;
  }

  return pool
    .connect()
    .then(client => {
      const query = `
      UPDATE users
      SET
        first_name = $2
        ,last_name = $3
        ,age = $4, snack = $5
        ,animal_type = $6
        ${!!thumbnail ? ',thumbnail_url = $7' : ''}
      WHERE user_id = $1`;
      const values = [user_id, first_name, last_name, age, snack, animal_type];

      if (!!thumbnail) {
        values.push(thumbnail);
      }
      return client.query(query, values);
    })
    .catch(err => {
      console.error('ERR', err);
      return null;
    });
};

const getFriendsList = user_id => {
  return pool
    .connect()
    .then(client => {
      const query = 'SELECT friend_id, first_name, last_name, thumbnail, follower_count, following_count FROM users AS u INNER JOIN friendship AS fs ON u.user_id = fs.friend_id WHERE fs.user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .catch(err => {
      client.release();
      return null;
    });
};

const getSearchFriends = email => {
  return pool
    .connect()
    .then(client => {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      client.release();
      return client.query(query, values);
    })
    .catch(err => {
      client.release();
      return null;
    });
};

const friendFollow = (user_id, friend_id) => {
  return pool.connect().then(client => {
    const query = 'INSERT INTO friendship (user_id, friend_id) VALUES ($1, $2)';
    const values = [user_id, friend_id];
    return client
      .query(query, values)
      .then(response => {
        const query2 = 'UPDATE users SET following_count = (SELECT COUNT (*) FROM friendship f WHERE f.user_id = $1) WHERE user_id = $1';
        const values2 = [user_id];
        return client.query(query2, values2);
      })
      .then(response => {
        const query3 = 'UPDATE users SET follower_count = (SELECT COUNT (*) FROM friendship f WHERE f.friend_id = $1) WHERE user_id = $1';
        const values3 = [friend_id];
        client.release();
        return client.query(query3, values3);
      })
      .catch(err => {
        client.release();
        return null;
      });
  });
};

const friendUnfollow = (user_id, friend_id) => {
  return pool.connect().then(client => {
    const query = 'DELETE FROM friendship WHERE user_id = $1 AND friend_id = $2';
    const values = [user_id, friend_id];
    return client
      .query(query, values)
      .then(response => {
        const query2 = 'UPDATE users SET following_count = (SELECT COUNT (*) FROM friendship f WHERE f.user_id = $1) WHERE user_id = $1';
        const values2 = [friend_id];
        return client.query(query2, values2);
      })
      .then(response => {
        const query3 = 'UPDATE users SET follower_count = (SELECT COUNT (*) FROM friendship f WHERE f.friend_id = $1) WHERE user_id = $1';
        const values3 = [user_id];
        client.release();
        return client.query(query3, values3);
      })
      .catch(err => {
        client.release();
        return null;
      });
  });
};

module.exports = {
  getProfile,
  putEditProfile,
  getFriendsList,
  getSearchFriends,
  friendFollow,
  friendUnfollow,
};
