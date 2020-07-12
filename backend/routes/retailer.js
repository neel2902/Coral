const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

router.get('/getCompletedOrders', checkAuth, productController.getCompletedOrders);


module.exports = router;