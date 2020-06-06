const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

const checkAuth = require('./middleware/check-auth');

const auth = require('./auth/authServer');





app.use(cors());
app.use(express.json())
app.use('/auth', auth);


app.get('/coral', checkAuth, (req, res) => {
    res.send('Only you can see this')
});


app.get('/', (req,res) => {
    res.json({
        message: 'Server is up and running!'
    })
})






app.listen(port)