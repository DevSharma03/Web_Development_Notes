import express from 'express';
const app = express();
const PORT = 5000;

// Simulate an in the middleware
app.use((req, res, next) => {
    const isError = true;
    if (isError) {
        const err = new Error('This is an error message');
        next(err);
    }
    else {
        next();
    }
});

//Regular Route
app.get('/', (req, res) => {
res,json({ message: 'Hello World' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stacks);
    res.status(err.status || 500);
    res.json({ message: 'Hello World', stacks: err.stacks });
});

// Start thr server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
