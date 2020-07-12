const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productController = require('../controllers/product');
const shipmentController = require('../controllers/shipment');

router.get('/getProducts', checkAuth, productController.getProducts);
router.post('/save', checkAuth, productController.saveProduct);
router.post('/createShipment', checkAuth, shipmentController.createShipment);
router.get('/getSentOrders', checkAuth, productController.getSentOrders);


module.exports = router;