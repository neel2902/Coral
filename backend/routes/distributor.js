const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

router.post('/save', checkAuth, productController.updateProduct);


module.exports = router;