const User = require("../models/userModel");

// Admin Middleware (Only Admins Can Access)
const isAdmin = async (req, res, next) => {
    const username = req.cookies.user;
    const user = await User.findOne({ username });

    if (!user || user.role !== "admin") {
        return res.status(403).send("Access Denied. Admins Only.");
    }
    next();
};

module.exports = isAdmin;
