const db = require('../service');
const helpers = require('./helpers');

module.exports = {

  /// USER CONTROLLERS ///

  getProfile: (req, res) => {
    if (!req.query.email) {
      res.status(400).send('Missing param "email"');
      return;
    }
    return db.getProfile(req.query.email)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('GET USER PROFILE ERROR: ', err);
      });
  },

  putEditProfile: (req, res) => {
    return db.putEditProfile(req.query.email, req.body.data.first_name, req.body.data.last_name, req.body.data.age, req.body.data.snack, req.body.data.animal_type)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).json('Unable to update user profile based on data');
        } else {
          res.status(200).json(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).json('PUT EDIT USER PROFILE ERROR: ', err);
      });
  },

  /// FRIENDS CONTROLLERS ///

  getFriendsList: (req, res) => {
    if (!req.query.email) {
      res.status(400).send('Missing parameter "email"');
      return;
    }
    return db.getFriendsList(req.query.email)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get friends list based on email');
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
    if (!req.query.userEmail || !req.query.friendEmail) {
      res.status(400).send('Missing one or more email parameters');
    }
    return db.postFriendFollow(req.query.userEmail, req.query.friendEmail)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to follow user based on friend email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('POST FRIEND FOLLOW ERROR: ', err);
      });
  },

  putFriendFollow: (req, res) => {
    if (!req.query.userEmail || !req.query.friendEmail) {
      res.status(400).send('Missing one or more email parameters');
    }
    return db.putFriendFollow(req.query.userEmail, req.query.friendEmail)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to unfollow friend based on friend email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send('PUT FRIEND FOLLOW ERROR: ', err);
      });
  },
};

