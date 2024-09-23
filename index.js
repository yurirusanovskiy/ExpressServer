const express = require("express");
const session = require("express-session");
const Router = require("./routes");

const app = express();

// Setting up express-session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, httpOnly: true }   // Cookie lifetime is 1 minute
}));

app.use(express.json());
app.use(Router);

const PORT = 3000;
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log(`Listening port ${PORT}`);
});
