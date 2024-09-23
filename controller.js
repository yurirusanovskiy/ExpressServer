const { generateToken } = require("./services");

// Login to receive a JWT token
function login(req, res) {
    const { username, password } = req.body;

    if (username === "admin" && password === "password") {
        const token = generateToken({ username });
        return res.json({ token });
    }

    return res.status(403).json({ message: "Invalid username or password" });
}

// Protected routes requiring JWT or session
function getAllData(req, res) {
    const data = [
        { name: "Alex", age: 24 },
        { name: "Vlad", age: 25 },
        { name: "Tom", age: 30 },
    ];
    res.json(data);
}

function getFirst(req, res) {
    const data = { name: "Alex", age: 24 };
    res.json(data);
}

function getSecond(req, res) {
    const data = { name: "Vlad", age: 25 };
    res.json(data);
}

function getError(req, res) {
    const data = { message: "Something goes wrong..." };
    res.status(500).json(data);
}

// Creating a new session
function newSession(req, res) {
    req.session.page_views = 1;  // We count the number of views
    req.session.authenticated = true;  // Authorization flag
    res.json({ message: "Session created. You can now access protected routes." });
}

// Проверка сессии
function sessionAuth(req, res, next) {
    if (req.session.authenticated) {
        req.session.page_views++;
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized: No session cookie present" });
    }
}

module.exports = {
    getAllData,
    getFirst,
    getSecond,
    getError,
    login,
    newSession,
    sessionAuth
};
