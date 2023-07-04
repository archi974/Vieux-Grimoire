const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: '.env.local'})

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        next();
    } catch (error) {
        res.status(403).json({message: "error while retrieving the identifier in the token : ", error });
    }
};