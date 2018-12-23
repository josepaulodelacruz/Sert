const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const users_controller = require('../controllers/users.controller');

router.post('/create', users_controller.user_create);
// routes/products.route.js

// router.get('/:id', product_controller.product_details);

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', users_controller.test);		
module.exports = router;

