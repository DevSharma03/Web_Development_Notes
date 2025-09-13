const notFound = ((req, res, next) => {
    const error = new Error("Hello, Its an wrong URL"); // Create a new error
    error.status = 404;
    next(error);
});

export default notFound; // Export the notFound middleware
