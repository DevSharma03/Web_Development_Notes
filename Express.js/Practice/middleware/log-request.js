import colors from "colors"; // Import colors for console.log

// Middleware function to log the request method and URL
const logRequest = (req, res, next) => {
    const methodColor={
        GET: "green",
        POST: "yellow",
        PUT: "blue",
        DELETE: "red"
    }

    const color = methodColor[req.method]; // Get the color for the request method

    console.log(`${req.method} ${req.protocol}://${req.get("host")} ${req.originalUrl}`[color]); // Log the request method and URL
    next(); // Call the next middleware function
};

export default logRequest; // Export the router
