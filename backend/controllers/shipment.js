const pool = require('../db/index');

exports.createShipment = async (req, res) => {
    try {
        const addShipment = 'INSERT INTO shipments (lot, batch, sender, receiver) VALUES($1, $2, $3, $4) RETURNING *';
        const shipmentData = [req.body.lot, req.body.batch, req.body.sender, req.body.receiver];
        const shipmentAdded = await pool.query(addShipment, shipmentData);
        const addDetails = 'INSERT INTO shipmentdetails (shipmentid, productid, quantity) VALUES($1, $2, $3) RETURNING *';
        const singleproductDetails = req.body.products;
        singleproductDetails.forEach(async (product) => {
            let productdetails = [shipmentAdded.rows[0].id, product.productid, product.quantity]
            await pool.query(addDetails, productdetails);
        });
        res.status(200).send("Shipment added");
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send(err);
    }
}

exports.getDistributorProducts = async (req, res) => {
    try {
        const getShipmentIds = `SELECT id FROM shipments WHERE receiver = '${req.userData.username}'`;
        const getids = await pool.query(getShipmentIds);
        if (getids.rowCount == 0) {
            res.send("No products found!");
        }
        else {
            const rowse = getids.rows;
            let products = [];

            let bar = new Promise((resolve, reject) => {
                rowse.forEach(async (row, index, array) => {
                    let result = await pool.query(`SELECT * FROM shipmentdetails WHERE shipmentid = '${row.id}'`);
                    products.push(result.rows[0]);
                    if (index === array.length -1) resolve();
                });
            })

            bar.then(() => {
                res.status(200).json({
                    products: products
                })
            })
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(400).send(err);
    }
}