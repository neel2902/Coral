const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const path = require('path');
const p = path.join(__dirname, '..', 'renders', 'try.png');
const pdfPath = path.join(__dirname, '..', 'renders', 'template.pdf');
const checkAuth = require('../middleware/check-auth');
const pdf = require('html-pdf');
const fs = require('fs');
const html = fs.readFileSync('../template.html', 'utf8');
const options = { format: 'A4' };

router.get('/', (req, res) => {
    pdf.create(html, options).toFile(pdfPath, function(err, result) {
        if (err) return console.log(err);
        res.sendFile(pdfPath);
      });
})

router.post('/', checkAuth, async (req, res) => {
    const productDetails = {
        ...req.userData,
        price: req.body.price,
        recipient: req.body.recipient
    }
    await generateQR(JSON.stringify(productDetails), res);
    res.sendFile(p);

});

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

module.exports = router;