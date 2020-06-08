require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const brcypt = require('bcrypt');
const pool = require('../db/index');
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

router.post('/signup', async (req,res) => {

        
    // let founduser = users.find(user => user.username == username);

    // if (founduser) {
    //     return res.status(409).json({
    //         message: 'Already exists!'
    //     })
    // }
    // else {
    //     const user = {
    //         username: username,
    //         password: password
    //     }
    //     users.push(user);
    //     return res.status(200).json({
    //         message: 'All ok!'
    //     });
    // }




    try {
        const findText = `SELECT * FROM users WHERE username='${req.body.username}'`;
        const foundUser = await pool.query(findText);
        if(foundUser.rowCount===0) {
            const hashedPass = await brcypt.hash(req.body.password, 10);
            const insertText = 'INSERT INTO users(username, password, role, geolocation, ethaddress) VALUES($1, $2, $3, $4, $5) RETURNING *'
            const userData = [ req.body.username, hashedPass, req.body.role, req.body.location, req.body.ethAddress];
            const result = await pool.query(insertText, userData);
            console.log("User created", result);
            res.status(201).send("User created");
        }
        else {
            res.status(409).send("User already exists");
        }
      } catch (err) {
        console.log(err.stack);
        res.status(400).send("Error");
      }

});


router.post('/login', async (req, res) => {
    // const { username, password } = req.body;
    try {
        const findText = `SELECT * FROM users WHERE username='${req.body.username}'`;
        const foundUser = await pool.query(findText);
        if (foundUser.rowCount===0) {
            res.status(404).send("User not found");
        }
        else {
            const authorized = await brcypt.compare(req.body.password, foundUser.rows[0].password );
            if (authorized) {
                generateToken(req.body.username, res);
            }
        }
    }
    catch (err) {
        console.log(err.stack);
        res.status(401).send("Unauthorised");
    }
})



function generateToken(username, res) {
    const token = jwt.sign({
        username: username
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

    res.status(200).json({
        message: "Successfully authenticated",
        token: token
    });
}



module.exports = router;