const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');
const shipmentController = require('../controllers/shipment');

router.post('/createShipment', checkAuth, shipmentController.createShipment);
router.get('/getProducts', checkAuth, shipmentController.getDistributorProducts);
router.get('/getCompletedOrders', checkAuth, productController.getCompletedOrders);
router.get('/getSentOrders', checkAuth, productController.getSentOrders);

module.exports = router;