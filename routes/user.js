const express = require('express');

const blogController = require('../controller/user');

const router = express.Router();

router.post('/register', blogController.registerUser);

module.exports = router;