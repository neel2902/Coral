const QRCode = require('qrcode');
const path = require('path');
const p = path.join(__dirname, '..', 'renders', 'try.png');
const pool = require('../db/index');



exports.saveProduct = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE upc='${req.body.upc}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            const insertText = 'INSERT INTO products (upc, manufacturer, distributor) VALUES($1, $2, $3) RETURNING *';
            const productData = [ req.body.upc, req.body.manufacturer, req.body.distributor];
            const result = await pool.query(insertText, productData);
            console.log("Product created", result);
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
        const findText = `SELECT * FROM products WHERE upc='${req.body.upc}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            res.status(404).send("Product does not exist!");
        }
        else {
            const updateText = "UPDATE products SET retailer = ($1) WHERE upc = ($2)";
            const productData = [ req.body.retailer, foundProduct.rows[0].upc ];
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


exports.getProductQR = async (req, res) => {
    try {
        const findText = `SELECT * FROM products WHERE upc='${req.body.upc}'`;
        const foundProduct = await pool.query(findText);
        if(foundProduct.rowCount===0) {
            res.send("Counterfeit drug!");
        }
        else {
            const productDetails = foundProduct.rows[0];
            await generateQR(JSON.stringify(productDetails), res);
            res.sendFile(p);
        }
    } catch (error) {
        console.log(err.stack);
        res.status(400).send("Error");
    }
}