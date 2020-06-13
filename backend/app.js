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




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(cors());
app.use(express.json());



app.use('/auth', auth);
app.use('/manufacturer/', manufacturer);


app.get('/dashboard', checkAuth, (req, res) => {
    res.send(req.userData);
});

app.get('/', (req,res) => {
    res.json({
        message: 'Server is up and running!'
    })
})






app.listen(port)