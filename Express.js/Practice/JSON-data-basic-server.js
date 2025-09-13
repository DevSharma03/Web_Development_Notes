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
    res.json(posts); // Respond with JSON data
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


// after this the server-query.js file is there where we have implemented the query parameter to get the data from the server.