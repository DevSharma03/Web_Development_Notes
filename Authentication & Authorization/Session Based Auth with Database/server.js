const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Configure Session without Redis
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Change to true in production with HTTPS
      maxAge: 1000 * 60 * 30, // 30 minutes
      sameSite: "strict",
    },
  })
);

// Routes
app.use(authRoutes);

// Protected Dashboard Route
app.get("/dashboard", authMiddleware, (req, res) => {
  res.render("dashboard", { username: req.session.user.username });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));




