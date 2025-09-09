// Import the 'http' module to create an HTTP server
const http = require("http");

// Create an HTTP server instance
const server = http.createServer((req, res) => {
  // The callback function is executed for every HTTP request to the server

  // Set the HTTP status code to 200 (OK) and the content type to 'text/plain'
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Write a response message to the client
  res.write("Hello, Node.js!");

  // End the response; this signals the server that the response is complete
  res.end();
});

// Make the server listen for incoming connections on port 3000
server.listen(3000, () => 
  // Callback function executed once the server starts successfully
  console.log("Server running on port 3000")
);

