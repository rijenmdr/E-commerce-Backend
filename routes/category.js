const express = require('express');

const categoryController = require('../controller/category');

const router = express.Router();

router.get('/get-categories', categoryController.getCategories);

router.post('/add', categoryController.addNewCategory);

module.exports = router;