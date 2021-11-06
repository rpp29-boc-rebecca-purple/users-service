const db = require('../service');

module.exports = {

  /// USER CONTROLLERS ///

  getProfile: (req, res) => {
    if (!req.query.user_id) {
      res.status(400).send('Missing param "user_id"');
      return;
    }
    return db.getProfile(req.query.user_id)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on user_id');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  getAllProfiles: (req, res) => {
    return db.getAllProfiles()
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get all users');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  putEditProfile: (req, res) => {
    if (!req.query.user_id) {
      res.status(400).send('Missing parameter "user_id"');
      return;
    }
    return db.putEditProfile(req.query.user_id, req.body.data.first_name, req.body.data.last_name, req.body.data.age, req.body.data.snack, req.body.data.animal_type, req.data.body.thumbnail)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).json('Unable to update user profile based on data');
        } else {
          res.status(200).send('Cuteness Updated!');
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  /// FRIENDS CONTROLLERS ///

  getFriendsList: (req, res) => {
    if (!req.query.email) {
      res.status(400).send('Missing parameter "user_id"');
      return;
    }
    return db.getFriendsList(req.query.email)
      .then((response) => {
        if (!response) {
          res.status(400).send('Unable to get friends list based on email');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  getSearchFriends: (req, res) => {
    if (!req.query.user_id) {
      res.status(400).send('Missing parameter "user_id"');
      return;
    }
    return db.getSearchFriends(req.query.user_id)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to get user profile based on user_id');
        } else {
          res.status(200).send(response.rows);
        }
      })
      .catch((err) => {
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
      return db.friendFollow(req.query.user_id, req.query.friend_id)
        .then((response) => {
          if (!response || response.rowCount === 0) {
            res.status(400).send('Unable to follow user based on friend id');
          } else {
            res.status(200).send('Stalking successful');
          }
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  },

  friendUnfollow: (req, res) => {
    if (!req.query.user_id || !req.query.friend_id) {
      res.status(400).send('Missing one or more id parameters');
    }
    return db.friendUnfollow(req.query.user_id, req.query.friend_id)
      .then((response) => {
        if (!response || response.rowCount === 0) {
          res.status(400).send('Unable to unfollow friend based on friend id');
        } else {
          res.status(200).send('We no longer stalk this friend');
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
};

