// created a basic express server with a few routes to get, post, put, and delete posts. It is more or like complete CRUD operation with express.js. or you can say a basic REST API with express.js and also a middleware function to log the request method and URL.
import express from "express"; // Import Express
const router = express.Router(); // Create an Express router

// Sample data
let posts = [
  { id: 1, title: "Post 1", content: "This is post 1" },
  { id: 2, title: "Post 2", content: "This is post 2" },
  { id: 3, title: "Post 3", content: "This is post 3" },
];


// API route to return all posts, optionally with a limit
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit); // Get the limit query parameter
  if (!isNaN(limit) && limit > 0) {
    // Check if the limit is a valid number
    res.status(200).json(posts.slice(0, limit)); // Respond with the limited number of posts
  } else {
    res.status(200).json(posts); // Respond with all posts
  }
});
// API route to return a single post by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get the post ID from the URL parameter
  const post = posts.find((post) => post.id === id); // Find the post by ID
  if (post) {
    res.status(200).json(post); // Respond with the matching post
  } else {
    res.status(404).json({ error: "Post not found" }); // Respond with an error if not found
  }
});

//create new post
router.post("/", (req, res) => {
    console.log(req.body);
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    if (!newPost.title || !newPost.content) {
        return res.status(400).json({ error: "Title and content are required." });
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

//update post
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  res.status(200).json(post);
});

//delete post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

export default router; // Export the router