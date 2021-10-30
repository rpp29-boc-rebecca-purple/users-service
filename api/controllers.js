const db = require('../service');
const helpers = require('./helpers');

module.exports = {

  /// USER CONTROLLERS ///

  getProfile: (req, res) => {
    if (!req.query.userId) {
      res.status(400).send('Missing param "userId"');
      return;
    }
    return db.getProfile(req.query.userId)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on userId');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('GET USER PROFILE ERROR: ', err);
      });
  },

  putEditProfile: (req, res) => {
    // Do your stuff here...
    res.send(200);
  },

  /// FRIENDS CONTROLLERS ///

  getFriendsList: (req, res) => {
    console.log(req.query);
    if (!req.query.userId) {
      res.status(400).send('Missing parameter "userId"');
      return;
    }
    return db.getFriendsList(req.query.userId)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get friends list based on userId');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('GET FRIEND LIST ERROR: ', err);
      });
  },

  getSearchFriends: (req, res) => {
    if (!req.query.email) {
      res.status(400).send('Missing parameter "email"');
      return;
    }
    return db.getSearchFriends(req.query.email)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('GET SEARCH FRIENDS ERROR: ', err);
      });
  },

  postFriendFollow: (req, res) => {
    // Do your stuff here...
    res.send(200);
  },

  putFriendFollow: (req, res) => {
    // Do your stuff here...
    res.send(200);
  },
};

