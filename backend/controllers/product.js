const QRCode = require('qrcode');
const path = require('path');
const p = path.join(__dirname, '..', 'renders', 'try.png');
const pool = require('../db/index');
const uniqid = require('uniqid');


exports.saveProduct = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE id='${req.body.id}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            const insertText = 'INSERT INTO products (id, productname, upc, sku) VALUES($1, $2, $3, $4) RETURNING *';
            const productData = [ req.body.id, req.body.productname, req.body.upc, req.body.sku];
            const result = await pool.query(insertText, productData);
            console.log(result);
            console.log("Product created");
            res.status(201).send("Product created");
        }
        else {
            res.send("Product already exists!");
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Error");
    }
}



exports.updateProduct = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE id='${req.body.id}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            res.status(404).send("Product does not exist!");
        }
        else {
            const updateText = "UPDATE products SET retailer = ($1) WHERE id = ($2)";
            const productData = [ req.body.retailer, foundProduct.rows[0].id ];
            const result = await pool.query(updateText, productData);
            console.log("Product updated");
            res.status(200).send("Product updated");
            
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("Error");
    }
}


exports.getProducts = async(req, res) => {
    try {
        const findText = `SELECT * FROM products`;
        const foundProducts = await pool.query(findText);
        if(foundProducts.rowCount===0) {
            res.send("No pending orders");
        }
        else {
            const productDetails = foundProducts.rows;
            res.status(200).json(productDetails);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Error");
    }

}


const generateQR = async (text, res) => {
    try {
        await QRCode.toFile(p, text, {
                color: {
                  dark: '#000',
                  light: '#fff' 
                }});
    } catch (err) {
        res.send(err);
    }
}

exports.getCompletedOrders = async (req, res) => {
    try {
        const findText = `SELECT * FROM shipments WHERE receiver = '${req.userData.username}'`;
        const foundOrders = await pool.query(findText);
        if(foundOrders.rowCount===0) {
            res.send("No pending orders");
        }
        else {
            const productDetails = foundOrders.rows;
            res.status(200).json(productDetails);
        }
    } catch (error) {
        res.status(400).send("Error");
    }
}


exports.getSentOrders = async (req, res) => {
    try {
        const findText = `SELECT * FROM shipments WHERE sender = '${req.userData.username}'`;
        const foundOrders = await pool.query(findText);
        if(foundOrders.rowCount===0) {
            res.send("No pending orders");
        }
        else {
            const productDetails = foundOrders.rows;
            res.status(200).json(productDetails);
        }
    } catch (error) {
        res.status(400).send("Error");
    }
}


exports.getProductQR = async (req, res) => {
    try {
        const findText = `SELECT * FROM shipmentdetails WHERE id='${req.params.id}'`;
        const foundShipmentDetails = await pool.query(findText);
        if(foundShipmentDetails.rowCount===0) {
            res.send("Counterfeit drug!");
        }
        else {
            const shipmentid = foundShipmentDetails.rows[0].shipmentid;
            const productid = foundShipmentDetails.rows[0].productid;
            const findText2 = `SELECT * FROM shipments WHERE id='${shipmentid}'`;
            const findText3 = `SELECT * FROM products WHERE id='${productid}'`;
            const foundShipment = await pool.query(findText2);
            const foundProduct = await pool.query(findText3);
            const date = foundShipment.rows[0].date;
            const lot = foundShipment.rows[0].lot;
            const batch = foundShipment.rows[0].batch;
            const sender = foundShipment.rows[0].sender;
            const receiver = foundShipment.rows[0].receiver;
            const productname = foundProduct.rows[0].productname;

            const data = {
                shipmentid: shipmentid,
                productid: productid,
                productname: productname,
                date: date,
                lot: lot,
                batch: batch,
                sender: sender,
                receiver: receiver
            }
        await generateQR(JSON.stringify(data), res);
        res.setHeader('Content-Type','image/png');
        res.sendFile(p);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error");
    }
}

exports.getProductData = async (req, res) => {
    try {
        const findText = `SELECT * FROM shipmentdetails WHERE id='${req.body.id}'`;
        const foundShipmentDetails = await pool.query(findText);
        if(foundShipmentDetails.rowCount===0) {
            res.send("Counterfeit drug!");
        }
        else {
            const shipmentid = foundShipmentDetails.rows[0].shipmentid;
            const productid = foundShipmentDetails.rows[0].productid;
            const findText2 = `SELECT * FROM shipments WHERE id='${shipmentid}'`;
            const findText3 = `SELECT * FROM products WHERE id='${productid}'`;
            const foundShipment = await pool.query(findText2);
            const foundProduct = await pool.query(findText3);
            const date = foundShipment.rows[0].date;
            const lot = foundShipment.rows[0].lot;
            const batch = foundShipment.rows[0].batch;
            const sender = foundShipment.rows[0].sender;
            const receiver = foundShipment.rows[0].receiver;
            const productname = foundProduct.rows[0].productname;

            const data = {
                shipmentid: shipmentid,
                productid: productid,
                productname: productname,
                date: date,
                lot: lot,
                batch: batch,
                sender: sender,
                receiver: receiver
            }
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(404).send("Not found");
    }
}