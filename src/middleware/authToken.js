const jwt = require('jsonwebtoken'); 
require('dotenv').config();

exports.verificarToken = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                auth: false,
                message: 'Failed to authenticate token'
            });
        }

        req.userId = decoded.id;

        next();
    });
}
