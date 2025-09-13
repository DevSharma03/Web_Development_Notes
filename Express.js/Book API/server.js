// Import the express library to create an Express app
const express = require('express');

// Initialize an instance of the Express app
const app = express();

// Set the port for the server to listen on
const port = 3000;

// Sample books data array
const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' }, 
    { id: 2, title: 'Book 2', author: 'Author 2' }, 
    { id: 3, title: 'Book 3', author: 'Author 3' },
    { id: 4, title: 'Book 4', author: 'Author 4' },
    { id: 5, title: 'Book 5', author: 'Author 5' }
];

// Middleware to parse JSON request bodies
app.use(express.json());  // This is necessary for handling POST request data

// Route to get all books
app.get('/', (req, res) => {
    // Send the books array as a JSON response when this endpoint is hit
    res.json(books);
});

// Route to get a specific book by ID
app.get('/:id', (req, res) => {
    // Extract the book ID from the request parameters and find the corresponding book
    const book = books.find(book => book.id === parseInt(req.params.id));
    // If the book is not found, send a 404 status with an error message
    if (!book) {
        return res.status(404).send('The book with the given ID was not found');
    }
    // If the book is found, return the book object as a JSON response
    res.json(book);
});

// Route to create a new book
app.post('/', (req, res) => {
    // Create a new book object with an ID (incremental), title, and author from the request body
    const book = {
        id: books.length + 1,  // Generate the next ID based on the current length of the books array
        title: req.body.title,  // Access the title from the request body
        author: req.body.author // Access the author from the request body
    };
    // Push the newly created book into the books array
    books.push(book);
    // Send the newly created book object back as a JSON response
    res.json(book);
});  

// Start the Express server and listen for requests on the specified port
app.listen(port, () => {
    // Log a message to indicate that the server is running
    console.log(`Server is running on port ${port}`);
});
