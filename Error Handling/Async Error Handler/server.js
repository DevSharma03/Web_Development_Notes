import express from "express";

const app = express();
const PORT = 5000;

// Middleware to simulate an error (Synchronous)
app.use((req, res, next) => {
    const isError = true; // Simulate an error condition
    try {
        if (isError) {
            throw new Error("This is a simulated error");
        }
        next();
    } catch (err) {
        next(err); // Forward error to middleware
    }
});

// Async Error Handling Wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Regular Route with Async Error Handling
app.get(
    "/",
    asyncHandler(async (req, res, next) => {
        // Simulating an async error
        const isError = true;
        if (isError) {
            throw new Error("Async error occurred!");
        }
        res.json({ message: "Hello World" });
    })
);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Hide stack in production
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

