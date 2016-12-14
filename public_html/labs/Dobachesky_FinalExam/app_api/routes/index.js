var express = require('express');
var router = express.Router();
var ctrlProduct = require('../controllers/product');

router.get('/products', ctrlProduct.productReadAll);
router.post('/products', ctrlProduct.productCreate);

module.exports = router;