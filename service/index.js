require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

const getProfile = (user_id) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT * FROM users WHERE user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const putEditProfile = (user_id, first_name, last_name, age, snack, animal_type, thumbnail) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'UPDATE users SET first_name = $2, last_name = $3, age = $4, snack = $5, animal_type = $6, thumbnail = $7 WHERE user_id = $1';
      const values = [user_id, first_name, last_name, age, snack, animal_type, thumbnail];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const getFriendsList = (user_id) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT first_name, last_name, thumbnail, follower_count, following_count FROM users AS u INNER JOIN friendship AS fs ON u.user_id = fs.friend_id WHERE fs.user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });

};

const getSearchFriends = (email) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const friendFollow = (user_id, friend_id) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'INSERT INTO friendship (user_id, friend_id) VALUES ($1, $2)';
      const values = [user_id, friend_id];
      client.release();
      return client.query(query, values);
    })
    .then((client) => {
      const query = 'UPDATE users SET following_count = following_count+1 WHERE user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .then((client) => {
      const query = 'UPDATE users SET follower_count = follower_count+1 WHERE user_id = $1';
      const values = [friend_id];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const friendUnfollow = (user_id, friend_id) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'DELETE FROM friendship WHERE user_id = $1 AND friend_id = $2';
      const values = [user_id, friend_id];
      client.release();
      return client.query(query, values);
    })
    .then((client) => {
      const query = 'UPDATE users SET following_count = following_count-1 WHERE user_id = $1';
      const values = [user_id];
      client.release();
      return client.query(query, values);
    })
    .then((client) => {
      const query = 'UPDATE users SET follower_count = follower_count-1 WHERE user_id = $1';
      const values = [friend_id];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

module.exports = {
  getProfile,
  putEditProfile,
  getFriendsList,
  getSearchFriends,
  friendFollow,
  friendUnfollow
};