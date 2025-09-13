import express from "express"; // Import Express
import path from "path"; // Import Path (optional, not used in your code)
import postRouter from "./routes/posts-ES-module-errorHandlerer.js"; // Import the post router
import logRequest from "./middleware/log-request.js"; // Import the logRequest middleware
import errorHandler from "./middleware/error.js"; // Import the errorHandler middleware
import notFound from "./middleware/not-found.js"; // Import the notFound middleware
// Set the port to use environment variable or a default value
const port = process.env.PORT || 3000;
const app = express(); // Create an Express application

app.use(express.json()); // Enable JSON body parsing
app.use(express.urlencoded({ extended: false })); // Enable URL-encoded body parsing

//logger middleware
app.use(logRequest); // Use the logRequest middleware

app.use("/api/posts", postRouter); // Use the post router for the /api/posts route

//error handler middleware
app.use(notFound); // Use the errorHandler middleware
app.use(errorHandler); // Use the errorHandler middleware

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});