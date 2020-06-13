require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const brcypt = require('bcrypt');

const authController = require('../controllers/authorisation');


router.post('/signup', authController.signup);
router.post('/login', authController.login);



module.exports = router;