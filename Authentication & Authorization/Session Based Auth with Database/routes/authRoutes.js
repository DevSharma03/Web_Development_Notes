const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// Render Registration Page
router.get("/register", (req, res) => {
  res.render("register", { message: "" });
});

// Handle User Registration
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ username, password: hashedPassword });
    res.redirect("/login");
  } catch (error) {
    res.render("register", { message: "User already exists!" });
  }
});

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

// Handle User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", { message: "Invalid credentials" });
  }

  req.session.user = { username };
  res.redirect("/dashboard");
});

// Handle Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
  });
});

module.exports = router;
