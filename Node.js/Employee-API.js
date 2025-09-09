const http = require("http"); // Import the 'http' module to create an HTTP server

// Array of employees data
const employees = [
    { id: 1, name: "John Doe", department: "IT" },
    { id: 2, name: "Jane Doe", department: "HR" },
];

// Create an HTTP server instance
const server = http.createServer((req, res) => {
    const { method, url } = req; // Extract the HTTP method and URL
    const parts = url.split("/"); // Split URL into parts for routing
    const id = parts[2]; // Extract employee ID if present

    if (method === "GET" && url === "/employees") {
        // Handle GET request to fetch all employees
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(employees));
    } else if (method === "GET" && parts[1] === "employees" && id) {
        // Handle GET request for a specific employee by ID
        const employee = employees.find((employee) => employee.id === parseInt(id));
        if (employee) {
            res.writeHead(200, { "Content-Type": "application/json" }); // Send response for found employee
            res.end(JSON.stringify(employee));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" }); // Send 404 response for not found
            res.end(JSON.stringify({ message: "Employee not found" }));
        }
    } else if (method === "POST" && url === "/employees") {
        // Handle POST request to create a new employee
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString(); // Collect the data from the request
        });

        req.on("end", () => {
            try {
                const newEmployee = JSON.parse(body); // Parse the JSON data
                employees.push(newEmployee); // Add the new employee to the array
                res.writeHead(201, { "Content-Type": "application/json" }); // Respond with 201 Created
                res.end(JSON.stringify(newEmployee));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" }); // Respond with 400 Bad Request for invalid JSON
                res.end(JSON.stringify({ message: "Invalid JSON format" }));
            }
        });
    } else {
        // Handle all other undefined routes
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server running on port 3000");
});

