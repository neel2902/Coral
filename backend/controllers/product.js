const QRCode = require('qrcode');
const path = require('path');
const p = path.join(__dirname, '..', 'renders', 'try.png');
const pool = require('../db/index');
const uniqid = require('uniqid');


exports.saveProduct = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE upc='${req.body.upc}' AND lot='${req.body.lot}' AND batch='${req.body.batch}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            const uid = uniqid();
            const insertText = 'INSERT INTO products (id, productname, upc, lot, batch, manufacturer, distributor) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const productData = [ uid, req.body.productname, req.body.upc, req.body.lot, req.body.batch, req.body.manufacturer, req.body.distributor];
            const result = await pool.query(insertText, productData);
            console.log("Product created");
            res.status(201).send("Product created");
        }
        else {
            res.send("Product already exists!");
        }
    } catch (err) {
        console.log(err.stack);
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
        console.log(err.stack);
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


exports.getPendingOrders = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE distributor = '${req.userData.ethaddress}' AND RETAILER IS NULL`;
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

exports.getCompletedOrders = async (req, res) => {
    try {
        console.log(req.userData);
        const findText = `SELECT * FROM products WHERE retailer = '${req.userData.ethaddress}'`;
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
        const findText = `SELECT * FROM products WHERE id='${req.params.id}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            res.send("Counterfeit drug!");
        }
        else {
            const productDetails = foundProduct.rows[0];
            await generateQR(JSON.stringify(productDetails), res);
            res.setHeader('Content-Type','image/png')
            res.sendFile(p);
        }
    } catch (error) {
        console.log(error.stack);
        res.status(400).send("Error");
    }
}

exports.getProductData = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE id='${req.body.id}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            res.send("Counterfeit drug!");
        }
        else {
            const productDetails = foundProduct.rows[0];
            res.status(200).json(productDetails);
        }
    } catch (error) {
        res.status(400).send("Error");
    }
}