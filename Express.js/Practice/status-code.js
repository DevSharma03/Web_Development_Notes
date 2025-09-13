const express = require("express"); // Import Express
const path = require("path"); // Import Path (optional, not used in your code)
// Set the port to use environment variable or a default value
const port = process.env.PORT || 3000;
const app = express(); // Create an Express application
// Sample data
let posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];
// API route to return all posts, optionally with a limit
app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit); // Get the limit query parameter
  if (!isNaN(limit) && limit > 0) {
    // Check if the limit is a valid number
    res.status(200).json(posts.slice(0, limit)); // Respond with the limited number of posts
  } else {
    res.status(200).json(posts); // Respond with all posts
  }
});
// API route to return a single post by ID
app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get the post ID from the URL parameter
  const post = posts.find((post) => post.id === id); // Find the post by ID
  if (post) {
    res.status(200).json(post); // Respond with the matching post
  } else {
    res.status(404).json({ error: "Post not found" }); // Respond with an error if not found
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});