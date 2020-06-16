const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();
const auth = require('./auth/authServer');
const checkAuth = require('./middleware/check-auth');
const manufacturer = require('./routes/manufacturer');
const distributor = require('./routes/distributor');
const productController = require('./controllers/product');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(cors());
app.use(express.json());



app.use('/auth', auth);
app.use('/manufacturer', manufacturer);
app.use('/distributor', distributor);


app.get('/dashboard', checkAuth, (req, res) => {
    res.send(req.userData);
});

app.post('/getQR', productController.getProductQR);

app.get('*', (req, res) => {
    res.send("404 page not found");
})
app.listen(port)