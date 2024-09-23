const jwt = require("jsonwebtoken");

const SECRET_KEY = "Asdqaz12";

// JWT token generation
function generateToken(user) {
    return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "3min" }); // "60s", "3min", "10h", "7d"
}

// JWT authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
}

module.exports = {
    generateToken,
    authenticateToken
};
