const router = require('express').Router();
const controllers = require('./controllers');

// EXAMPLES (Each route has a controller)
router.get('/example', controllers.getExample);
router.post('/example', controllers.setExample);

module.exports = router;