// Importing the 'http' module to create an HTTP server
import http from "http";

// Defining the port on which the server will listen
const PORT = 3000;

// Creating an HTTP server instance
const server = http.createServer((req, res) => {
  // This callback function executes for every HTTP request received by the server

  // Setting the HTTP response header with status code 200 (OK) and content type 'text/plain'
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Routing based on the requested URL
  if (req.url === "/") {
    // Handle the root URL ('/') by sending a "Hello World" response
    res.write("Hello World");
    res.end(); // End the response
  } else if (req.url === "/about") {
    // Handle the '/about' URL by sending an "About Us" response
    res.write("About Us");
    res.end(); // End the response
  } else {
    // Handle all other URLs by sending a "404 Page Not Found" response
    res.write("404 Page Not Found");
    res.end(); // End the response
  }
});

// Start the server and listen for incoming connections on the specified port
server.listen(PORT, () =>
  // Log a message to the console when the server starts successfully
  console.log(`Server running on port ${PORT}`)
);

// Output: Logs "Server running on port 3000" to the console and serves appropriate responses for different URLs
