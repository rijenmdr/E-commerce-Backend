const express = require('express');

const tagController = require('../controller/tag');

const router = express.Router();

router.post('/add', tagController.addNewTag);

module.exports = router;