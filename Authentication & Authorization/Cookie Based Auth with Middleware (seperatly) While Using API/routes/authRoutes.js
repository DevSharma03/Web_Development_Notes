const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Login API (Set Cookie on Successful Login)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: user._id }, "supersecretkey", { expiresIn: "1h" });

  // Set HTTP-only Cookie
  res.cookie("authToken", token, {
    httpOnly: true, // Prevents JavaScript access (protects against XSS)
    secure: false, // Should be true in production (requires HTTPS)
    sameSite: "Strict", // Helps prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1-hour expiry
  });

  res.json({ message: "Login successful" });
});

// Logout API (Clears Cookie)
router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
