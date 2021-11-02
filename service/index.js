require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

const getProfile = (email) => {
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

const putEditProfile = (email, first_name, last_name, age, snack) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'UPDATE users SET first_name = $2, last_name = $3, age = $4, snack = $5, animal_type = $6 WHERE email = $1'; // to update userId params
      const values = [email, first_name, last_name, age, snack, animal_type];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const getFriendsList = (email) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT first_name, last_name, thumbnail FROM users AS u INNER JOIN friendship AS fs ON u.email = fs.friendEmail WHERE fs.userEmail = $1';
      const values = [email];
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
      console.log(err.stack);
      return null;
    });
};

const friendFollow = (userEmail, friendEmail) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'INSERT INTO friendship (user, friend) VALUES ($1, $2)';
      const values = [userEmail, friendEmail];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
      return null;
    });
};

const friendUnfollow = (userEmail, friendEmail) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'DELETE FROM friendship WHERE userEmail = $1 AND friendEmail = $2';
      const values = [userEmail, friendEmail];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
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