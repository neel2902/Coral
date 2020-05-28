require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/coralDB";
const app = express();

mongoose.connect(uri, { useNewUrlParser: true });
app.use(express.json());

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    company: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        trim: true,
        required: true
    }
});
const User = mongoose.model('User', userSchema);

//dummy
app.get('/', (req, res) => {
    const message = {
        'message': 'Server is up and running!'
    }
    res.json(message);
})


//login
app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        User.findOne({ 'email': email }, function (err, foundUser) {
            if (err) {
                res.status(404).send('User not found');
            }
            else {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, function (err, result) {
                        if (result === true) {
                            res.status(200).send('Logged in');
                        }
                    });
                }
                else {
                    res.status(401).send('Wrong password');
                }
            }
        });
    }
    catch {
        res.status(500).send();
    }
});



//register
app.post('/register', async (req, res) => {
    try {
        const userReg = req.body;
        User.findOne({ 'email': userReg.email }, async function (err, user) {
            if (user) {
                console.log('Existing user tried to register')
                return res.status(400).send("Existing user tried to register");
            }
            else if (user == null || user == 'undefined') {
                bcrypt.hash(userReg.password, 10, function (err, result) {
                    if (err) { throw (err); }
                    const newUser = new User({
                        firstName: userReg.firstName,
                        lastName: userReg.lastName,
                        email: userReg.email,
                        password: result,
                        company: userReg.company,
                        role: userReg.role
                    });
                    newUser.save();
                    return res.status(201).send("User successfully created");
                });
            }
            else {
                return res.status(404).send();
            }
        });
    }
    catch {
        res.status(500).send();
    }
});



app.listen(3000, function () {
    console.log('Server started on port 3000');
});