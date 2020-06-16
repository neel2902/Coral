const pool = require('../db/index');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login =  async (req, res) => {
    // const { username, password } = req.body;
    try {
        const findText = `SELECT * FROM users WHERE username='${req.body.username}'`;
        const foundUser = await pool.query(findText);
        if (foundUser.rowCount===0) {
            res.status(404).send("User not found");
        }
        else {
            const authorized = await brcypt.compare(req.body.password, foundUser.rows[0].password );
            console.log(foundUser.rows[0]);
            if (authorized) {

                const payload = {
                    username: foundUser.rows[0].username,
                    role: foundUser.rows[0].role,
                    geolocation: foundUser.rows[0].geolocation,
                    ethaddress: foundUser.rows[0].ethaddress
                }

                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
            
                res.status(200).json({
                    message: "Successfully authenticated",
                    token: token
                });
            }
            else {
                res.status(401).json({
                    message: "Unauthorised"
                })
            }
        }
    }
    catch (err) {
        console.log(err.stack);
        res.status(401).send("Unauthorised");
    }
}

exports.signup = async (req,res) => {
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
}