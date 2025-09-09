// Import the HTTP module
const { createServer } = require('http');

// Define the port the server will listen on (default to 3000 if not specified)
const PORT = process.env.PORT || 3000;

// In-memory storage for user data
const users = [];

// Middleware: Logger
// Logs incoming requests to the console
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`); // Log the HTTP method and URL
  next(); // Call the next middleware or route handler
}

// Middleware: JSON Response Setter
// Sets the response header to indicate JSON content
function jsonMiddleware(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
}

// Route Handler: Get All Users
// Returns the list of all users as a JSON response
function getUsersHandler(req, res) {
  res.writeHead(200); // HTTP 200 OK
  res.end(JSON.stringify(users)); // Send the users array as a JSON string
}

// Route Handler: Get User by ID
// Returns a single user based on the ID provided in the URL
function getUserByIdHandler(req, res) {
  const id = req.url.split('/').pop(); // Extract the ID from the URL
  const user = users.find(u => u.id === id); // Find the user with the matching ID

  if (user) {
    res.writeHead(200); // HTTP 200 OK
    res.end(JSON.stringify(user)); // Send the user object as JSON
  } else {
    res.writeHead(404); // HTTP 404 Not Found
    res.end(JSON.stringify({ message: 'User not found' })); // Send an error message
  }
}

// Route Handler: Create New User
// Accepts JSON data in the request body and adds a new user to the list
function createUserHandler(req, res) {
  let body = '';

  // Listen for incoming data chunks
  req.on('data', chunk => {
    body += chunk.toString(); // Append each chunk to the body string
  });

  // When all data is received
  req.on('end', () => {
    try {
      const newUser = JSON.parse(body); // Parse the JSON data
      newUser.id = Date.now().toString(); // Generate a unique ID based on the current timestamp
      users.push(newUser); // Add the new user to the list

      res.writeHead(201); // HTTP 201 Created
      res.end(JSON.stringify(newUser)); // Send the created user as a JSON response
    } catch (error) {
      res.writeHead(400); // HTTP 400 Bad Request
      res.end(JSON.stringify({ message: 'Invalid JSON data' })); // Send an error message
    }
  });
}

// Route Handler: Unsupported Routes
// Handles requests to routes that are not defined
function notFoundHandler(req, res) {
  res.writeHead(404); // HTTP 404 Not Found
  res.end(JSON.stringify({ message: 'Route not found' })); // Send an error message
}

// Create the HTTP server
const server = createServer((req, res) => {
  // Logger middleware to log each request
  logger(req, res, () => {
    // JSON middleware to set the response header
    jsonMiddleware(req, res, () => {
      // Route matching logic
      if (req.url === '/api/users' && req.method === 'GET') {
        // Handle GET request to fetch all users
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) && // Match URLs like /api/users/:id
        req.method === 'GET'
      ) {
        // Handle GET request to fetch a user by ID
        getUserByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        // Handle POST request to create a new user
        createUserHandler(req, res);
      } else {
        // Handle unsupported routes
        notFoundHandler(req, res);
      }
    });
  });
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server start message
});

