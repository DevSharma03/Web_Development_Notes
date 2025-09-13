// created a basic express server with a few routes to get, post, put, and delete posts. It is more or like complete CRUD operation with express.js. or you can say a basic REST API with express.js and also a middleware function to log the request method and URL.
import express from "express"; // Import Express
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController.js"; // Import the post controller
const router = express.Router(); // Create an Express router

// API route to return all posts, optionally with a limit
router.get("/", getPosts);

// API route to return a single post by ID
router.get("/:id", getPostById);

//create new post
router.post("/", createPost);

//update post
router.put("/:id", updatePost);

//delete post
router.delete("/:id", deletePost);

export default router; // Export the router