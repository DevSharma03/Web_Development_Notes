const express = require("express");
const app = express();
const path = require("path");

//serve static files
app.use(express.static(path.join(__dirname, "public")));

//render
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "contact.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "gallery.html"));
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
