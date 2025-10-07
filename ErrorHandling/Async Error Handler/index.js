// with axios 
import express from "express";
import axios from "axios";

const app = express();
const PORT = 5000;

// Middleware to simulate a synchronous error
app.use((req, res, next) => {
    const isError = false; // Set to true to simulate an error
    try {
        if (isError) {
            throw new Error("This is a simulated middleware error");
        }
        next();
    } catch (err) {
        next(err);
    }
});

// Async Error Handling Wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Route with Axios Request (Handling Async Errors)
app.get(
    "/fetch-data",
    asyncHandler(async (req, res, next) => {
        const apiUrl = "https://jsonplaceholder.typicode.com/posts/1"; // Sample API
        const response = await axios.get(apiUrl);
        res.json(response.data);
    })
);

// Simulating an Axios error
app.get(
    "/error",
    asyncHandler(async (req, res, next) => {
        const apiUrl = "https://jsonplaceholder.typicode.com/invalid-url"; // Invalid endpoint
        const response = await axios.get(apiUrl);
        res.json(response.data);
    })
);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.response?.status || 500).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
