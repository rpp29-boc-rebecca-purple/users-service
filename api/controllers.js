const db = require('../service');
const helpers = require('./helpers');

module.exports = {
  /// USER CONTROLLERS ///

  getProfile: (req, res) => {
    if (!req.query.user_id) {
      res.status(400).send('Missing param "user_id"');
      return;
    }
    return db
      .getProfile(req.query.user_id)
      .then(response => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on user_id');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  putEditProfile: async (req, res) => {
    const { user_id, first_name, last_name, age, snack, animal_type } = req.body;

    if (!req.query.user_id) {
      res.status(400).send('Missing parameter "user_id"');
      return;
    }

    let photoData = await helpers.storePhoto(req);
    let thumbnailUrl = photoData.Location;

    return db
      .putEditProfile(user_id, first_name, last_name, age, snack, animal_type, thumbnailUrl)
      .then(response => {
        if (!response || response.rowCount === 0) {
          res.status(400).json('Unable to update user profile based on data');
        } else {
          res.status(200).send('Cuteness Updated!');
        }
      })
      .catch(err => {
        console.error('err:', err);
        res.status(400).json(err);
      });
  },

  /// FRIENDS CONTROLLERS ///

  getFriendsList: (req, res) => {
    if (!req.query.user_id) {
      res.status(400).send('Missing parameter "user_id"');
      return;
    }
    return db
      .getFriendsList(req.query.user_id)
      .then(response => {
        if (!response) {
          res.status(400).send('Unable to get friends list based on user_id');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  getSearchFriends: (req, res) => {
    if (!req.query.email) {
      res.status(400).send('Missing parameter "email"');
      return;
    }
    return db
      .getSearchFriends(req.query.email)
      .then(response => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  friendFollow: (req, res) => {
    if (!req.query.user_id || !req.query.friend_id) {
      res.status(400).send('Missing one or more id parameters');
    }

    if (req.query.user_id === req.query.friend_id) {
      res.status(200).send('You already are your own best friend! :) \nUnable to follow yourself');
    } else {
      return db
        .friendFollow(req.query.user_id, req.query.friend_id)
        .then(response => {
          if (!response) {
            res.status(400).send('Unable to follow user based on the id parameters');
          } else {
            res.status(200).send('Stalking successful');
          }
        })
        .catch(err => {
          res.status(400).send(err);
        });
    }
  },

  friendUnfollow: (req, res) => {
    if (!req.query.user_id || !req.query.friend_id) {
      res.status(400).send('Missing one or more id parameters');
    }
    return db
      .friendUnfollow(req.query.user_id, req.query.friend_id)
      .then(response => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to unfollow friend based on friend id');
        } else {
          res.status(200).send('We no longer stalk this friend');
        }
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};
