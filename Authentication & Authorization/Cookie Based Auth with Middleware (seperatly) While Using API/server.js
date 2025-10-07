const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const authenticateUser = require("./middlewares/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/cookieAuthDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);

// Protected API Route (Requires Authentication)
app.get("/dashboard", authenticateUser, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));



// http://localhost:5000/auth/login
// {
//   "username": "devashish",
//   "password": "password"
// }


