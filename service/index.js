require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

const getProfile = (userId) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT * FROM users WHERE first_name = $1'; // to update userId param
      const values = [userId];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const putEditProfile = (userId, first_name, last_name, age, snack) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'UPDATE users SET last_name = $3, age = $4 WHERE first_name = $2'; // to update userId params
      const values = [userId, first_name, last_name, age, snack];
      client.release();
      return client.query(query, values);
    })
    .catch((err) => {
      client.release();
      return null;
    });
};

const getFriendsList = (userId) => {
  return pool
    .connect()
    .then((client) => {
      const query = 'SELECT first_name, last_name, thumbnail FROM users WHERE first_name = $1'; // to update params
      const values = [userId];
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

const friendFollow = (userId, friendId) => {
  // Insert query

};

const friendUnfollow = (userId, friendId) => {
  // Insert query
};

module.exports = {
  getProfile,
  putEditProfile,
  getFriendsList,
  getSearchFriends,
  friendFollow,
  friendUnfollow
};