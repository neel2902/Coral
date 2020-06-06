require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const brcypt = require('bcrypt');

const users  = [
    {
        username: 'admin',
        password: 'test'
    },
    {
        username: 'admin2',
        password: 'test'
    },
    {
        username: 'admin3',
        password: 'test'
    },
]


router.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    })
});

router.post('/signup', (req,res) => {
    //find if existing user by checking username with stored users
    const username = req.body.username;
    const password = req.body.password;


    let founduser = users.find(user => user.username == username);

    if (founduser) {
        return res.status(409).json({
            message: 'Already exists!'
        })
    }
    else {
        const user = {
            username: username,
            password: password
        }
        users.push(user);
        return res.status(200).json({
            message: 'All ok!'
        });
    }

    //else hash the password and store in the database (user created? 201 || error? 500)

});


router.post('/login', (req, res) => {
    //find user by username
    const { username, password } = req.body;

    const found = users.find(user => (user.username == username && user.password  == password));

    if (found) {
        generateToken(username, res);
    }
    else {
        res.status(401).json({
            message: 'Login unsuccessful'
        })
    }
    //brcypt compare passwords
    //if true, jwt sign with {username}, JTW key, {expiresIn: '1h'} then save to variable token and return a message and token


})



function generateToken(username, res) {
    const token = jwt.sign({
        username: username
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    res.header('Authorization', 'Bearer '+ token);
    console.log(token);
    res.status(200).send("Successfully authenticated");
}



module.exports = router;