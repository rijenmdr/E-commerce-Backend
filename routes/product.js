const express = require('express');

const productController = require('../controller/product');
const brandController = require('../controller/brand');

const router = express.Router();

//brand
router.post('/add-brand', brandController.addNewBrand);

//products
router.get('/get-products', productController.getProducts);

router.post('/add', productController.addProduct);

module.exports = router;