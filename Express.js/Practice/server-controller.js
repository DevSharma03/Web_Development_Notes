import express from "express";
import path from "path";
import postRouter from "./routes/posts-controller-router.js";
import logRequest from "./middleware/log-request.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/not-found.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middleware
app.use(logRequest);

// Post routes
app.use("/api/posts", postRouter);

// Error-handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});