// Import required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const path = require("path");

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser()); // Middleware to handle cookies
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));

// Fake User Database with hashed password
const users = [{ id: 1, username: "devashish", password: bcrypt.hashSync("password", 10) }];

// Render Login Page
app.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  
  // Check if user exists and password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render("login", { message: "Invalid credentials" });
  }

  // Set authentication cookie
  res.cookie("user", username, { httpOnly: true, maxAge: 1000 * 60 * 24, sameSite: "strict" });
  res.redirect("/dashboard"); // Redirect to dashboard after login
});

// Middleware to check authentication via cookie
const authenticateUser = (req, res, next) => {
  if (!req.cookies.user) {
    return res.redirect("/login");
  }
  next();
};

// Protected Route (Only accessible if logged in)
app.get("/dashboard", authenticateUser, (req, res) => {
  res.render("dashboard", { username: req.cookies.user });
});

// Logout Route
app.post("/logout", (req, res) => {
  res.clearCookie("user"); // Clear the authentication cookie
  res.redirect("/login"); // Redirect to login page after logout
});

// Start the Express server
app.listen(5000, () => console.log("Server running on port 5000"));


