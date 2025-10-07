const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: "user" }, // Default role is "user"
});

module.exports = mongoose.model("User", UserSchema);
