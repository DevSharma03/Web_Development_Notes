const express = require('express'); // Import Express
const path = require('path'); // Import Path (optional, not used in your code)

// Set the port to use environment variable or a default value
const port = process.env.PORT || 3000;
const app = express(); // Create an Express application
// Sample data
let posts = [
    { id: 1, title: 'Post 1', content: 'This is post 1' },
    { id: 2, title: 'Post 2', content: 'This is post 2' },
    { id: 3, title: 'Post 3', content: 'This is post 3' }
];
// API route to return all posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit)  // Get the limit query parameter
    if (!isNaN(limit) && limit > 0) { // Check if the limit is a valid number
        res.json(posts.slice(0, limit)); // Respond with JSON data
    }
    else{
        res.json(posts); // Respond with JSON data
    }
});
// API route to return a single post
app.get('/api/posts/:id', (req, res) => {
    const id = req.params.id; // Get the post ID from the URL parameter
    res.json(posts.filter((post) => post.id == id)); // Respond with JSON data
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// This code is a simple Express.js server that serves a list of posts. It includes two API routes:
// 1. `/api/posts`: Returns all posts or a limited number of posts based on the `limit` query parameter.
// 2. `/api/posts/:id`: Returns a single post based on the post ID provided in the URL parameter.
// The server listens on a specified port (default is 3000) and logs a message when it starts.
// The sample data is an array of post objects, each with an `id`, `title`, and `content`.
// The server uses the Express framework to handle HTTP requests and responses.
// The `path` module is imported but not used in this code snippet. It can be used for handling file paths if needed in the future.
// The code is a good starting point for building a RESTful API with Express.js, allowing clients to retrieve posts in a flexible manner.
// The use of query parameters allows for more dynamic and customizable API responses, making it easier to work with large datasets.
// The server can be extended further by adding more routes, middleware, and error handling as needed.
// Overall, this code provides a solid foundation for building a simple API with Express.js and serves as a good practice exercise for working with query parameters and routing in Express.




// it basicly shows how to use the query parameter in the server to get the data from the server.(we can limit the ports to render as how much we want as i want first 2 to render then i will use the api as /api/posts?limit=2 and it will render the first 2 posts.)
// and if i want to render all the posts then i will use the api as /api/posts and it will render all the posts.)