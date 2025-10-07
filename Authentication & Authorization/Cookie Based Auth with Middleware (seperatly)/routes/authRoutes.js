const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const router = express.Router();

// Render Login Page
router.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

// Render Register Page
router.get("/register", (req, res) => {
  res.render("register", { message: "" });
});

// Register User
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.render("register", { message: "Username already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, password: hashedPassword, role: role || "user" });
  await newUser.save();

  res.redirect("/login");
});

// Login User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render("login", { message: "Invalid credentials" });
  }

  res.cookie("user", username, { httpOnly: true, maxAge: 1000 * 60 * 60, sameSite: "strict" });
  res.redirect("/dashboard");
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/login");
});

module.exports = router;
