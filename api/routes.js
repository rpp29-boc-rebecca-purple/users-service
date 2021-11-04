const router = require('express').Router();
const controllers = require('./controllers');

/// USER ROUTES ///

// GET request to render user profile information based on provided user ID
router.get('/user/', controllers.getProfile);

// PUT request to update the user profile (provided userID must match currently logged in user)
router.put('/user/edit', controllers.putEditProfile);

/// FRIEND ROUTES ///

// GET request for rendering a list of all friends for the current user
// -> returns an array of objects containing information for each friend of current user
router.get('/user/friendsList', controllers.getFriendsList);

// POST request to follow a new friend
router.post('/user/friendsList/follow', controllers.friendFollow);

// PUT request to unfollow a friend
router.put('/user/friendsList/unfollow', controllers.friendUnfollow);

// GET request to search for new friends based on provided email address
router.get('/searchFriend/', controllers.getSearchFriends);

module.exports = router;