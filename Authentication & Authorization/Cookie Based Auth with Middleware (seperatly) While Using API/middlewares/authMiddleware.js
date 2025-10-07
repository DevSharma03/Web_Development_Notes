const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Middleware to verify authentication via cookies
const authenticateUser = async (req, res, next) => {
    const token = req.cookies.authToken;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, please log in." });
    }

    try {
        const decoded = jwt.verify(token, "supersecretkey"); // Verify token
        req.user = await User.findById(decoded.userId).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired session." });
    }
};

module.exports = authenticateUser;
