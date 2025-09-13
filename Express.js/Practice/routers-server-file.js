const express = require("express"); // Import Express
const path = require("path"); // Import Path (optional, not used in your code)
const postRouter = require("./routes/posts"); // Import the post router
// Set the port to use environment variable or a default value
const port = process.env.PORT || 3000;
const app = express(); // Create an Express application

app.use("/api/posts", postRouter); // Use the post router for the /api/posts route

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// basic router using the posts.js file as router and its the first route.