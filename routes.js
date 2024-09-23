const express = require("express");
const {
    getAllData,
    getFirst,
    getSecond,
    getError,
    login,
    newSession,
    sessionAuth
} = require("./controller");

const { authenticateToken } = require("./services");

const router = express.Router();

// Route for creating a session
router.post("/new-session", newSession);

// JWT login route
router.post("/login", login);

// // Protected routes WITH SESSIONAL authorization
// router.get('/data', sessionAuth, getAllData);
// router.get("/first", sessionAuth, getFirst);
// router.get("/second", sessionAuth, getSecond);

// Protected Routes With JWT Authentication (commented out for session testing)
router.get('/data', authenticateToken, getAllData);
router.get("/first", authenticateToken, getFirst);
router.get("/second", authenticateToken, getSecond);

// Route for error handling
router.get("/*", getError);

module.exports = router;
