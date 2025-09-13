import express from "express"; // Import Express
import path from "path"; // Import Path (optional, not used in your code)
import postRouter from "./routes/posts-ES-module.js"; // Import the post router
// Set the port to use environment variable or a default value
const port = process.env.PORT || 3000;
const app = express(); // Create an Express application

app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: false })); // Enable URL-encoded body parsing

app.use("/api/posts", postRouter); // Use the post router for the /api/posts route
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});