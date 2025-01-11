const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/uploadProduct', productController.uploadProduct);
router.get('/product', productController.getProducts);

module.exports = router;
