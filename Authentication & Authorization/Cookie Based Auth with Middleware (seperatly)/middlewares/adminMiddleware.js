const User = require("../models/userModel");

// Authentication Middleware
const authenticateUser = async (req, res, next) => {
    if (!req.cookies.user) {
        return res.redirect("/login"); // Redirect if not authenticated
    }
    next();
};

module.exports = authenticateUser;
