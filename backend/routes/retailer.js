const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');

router.post('/update', checkAuth, productController.updateProduct);
router.get('/getOrders', checkAuth, productController.getCompletedOrders);


module.exports = router;