const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userData = decoded;
        next();
    }
    catch { 
        res.status(401).json({
            error: "Invalid request, please send token in authorization header."
        })
    }
}