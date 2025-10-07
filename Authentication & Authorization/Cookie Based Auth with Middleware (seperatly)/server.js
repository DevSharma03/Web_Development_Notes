// Import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// Import middlewares & routes
const authenticateUser = require("./middlewares/authMiddleware");
const isAdmin = require("./middlewares/adminMiddleware");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://devashishbsharma:Mongodb12@practicemodule.8cpdh.mongodb.net/AuthPractice", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
app.use("/", authRoutes);

// Protected Dashboard Route
app.get("/dashboard", authenticateUser, async (req, res) => {
  const username = req.cookies.user;
  const user = await require("./models/userModel").findOne({ username });
  res.render("dashboard", { username: user.username, role: user.role });
});

// Admin-Only Route
app.get("/admin", authenticateUser, isAdmin, (req, res) => {
  res.send("<h1>Welcome, Admin!</h1><p>Only admins can see this page.</p>");
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));




