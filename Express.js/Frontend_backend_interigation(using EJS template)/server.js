const express = require("express");
const ejsLayout = require("express-ejs-layouts");
const app = express();
const path = require("path");

//serve static files
app.use(express.static(path.join(__dirname, "public")));

// set up the view engine(EJS template)
app.set("view engine", "ejs");
//plugin the ejs layout as middleware
app.use(ejsLayout);
app.set("layout", "layouts/layout");

//render
app.get("/", (req, res) => {
  res.render("home" , {title: "Home"});
});

app.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

app.get("/contact", (req, res) => {
  res.render("contact", {title: "Contact"});
});

app.get("/gallery", (req, res) => {
  res.render("gallery", {title: "Gallery"});
});

app.get("/users", (req, res) => {
  //fetch data from dummy users
  const userData = {username: "John Doe", email: "john.due@example.com", phone: "1234567890", address: "123, XYZ Street, ABC City", age: "23",isPremiumUser: true, isLogin: true, title: "User Data"};
  res.render("userData", userData);
});

app.get("/products", (req, res) => {
  //fetch data from dummy products
  const productData = [
    {name: "Product 1", price: 1000},
    {name: "Product 2", price: 2000},
    {name: "Product 3", price: 3000},
    {name: "Product 4", price: 4000},
    {name: "Product 5", price: 5000},
  ];
  res.render("product", {productData, title: "Product Data"});
});

// start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
