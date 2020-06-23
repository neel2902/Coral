const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

router.post('/update', checkAuth, productController.updateProduct);
router.get('/getPendingOrders', checkAuth, productController.getPendingOrders);


module.exports = router;