// Import required modules
const express = require("express");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser()); // Middleware to handle cookies
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://devashishbsharma:Mongodb12@practicemodule.8cpdh.mongodb.net/AuthPractice", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, default: "user" }, // Default role is "user", admin users have "admin"
});
const User = mongoose.model("User", UserSchema);

// 🛡️ Authentication Middleware
const authenticateUser = (req, res, next) => {
  if (!req.cookies.user) {
    return res.redirect("/login"); // Redirect to login if not authenticated
  }
  next(); // Proceed to the next middleware or route handler
};

// 🔐 Admin Middleware (Only Admins can access)
const isAdmin = async (req, res, next) => {
  const username = req.cookies.user;
  const user = await User.findOne({ username });

  if (!user || user.role !== "admin") {
    return res.status(403).send("Access Denied. Admins Only.");
  }
  next();
};

// 🏠 Render Login Page
app.get("/login", (req, res) => {
  res.render("login", { message: "" });
});

// 🏠 Render Registration Page
app.get("/register", (req, res) => {
  res.render("register", { message: "" });
});

// 📝 Register User
app.post("/register", async (req, res) => {
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

// 🔑 Login User
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  // Check if user exists and password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render("login", { message: "Invalid credentials" });
  }

  // Set authentication cookie
  res.cookie("user", username, { httpOnly: true, maxAge: 1000 * 60 * 60, sameSite: "strict" });
  res.redirect("/dashboard");
});

// 🛡️ Protected Dashboard Route (Only for logged-in users)
app.get("/dashboard", authenticateUser, async (req, res) => {
  const username = req.cookies.user;
  const user = await User.findOne({ username });
  res.render("dashboard", { username: user.username, role: user.role });
});

// 🔐 Admin-Only Route
app.get("/admin", authenticateUser, isAdmin, (req, res) => {
  res.send("<h1>Welcome, Admin!</h1><p>Only admins can see this page.</p>");
});

// 🚪 Logout Route
app.post("/logout", (req, res) => {
  res.clearCookie("user"); // Clear authentication cookie
  res.redirect("/login");
});

// Start the Express server
app.listen(5000, () => console.log("Server running on port 5000"));



