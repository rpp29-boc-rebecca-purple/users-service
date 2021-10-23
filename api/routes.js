const router = require('express').Router();
const controllers = require('./controllers');
const auth = require('./middleware').auth;

// EXAMPLES (Each route has a controller)
router.get('/example', auth, controllers.getExample); // Use the auth middleware to authorize requests. Requests must have a valid JWT token from the auth service
router.post('/example', controllers.setExample);

module.exports = router;