const express = require('express');
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();

const url = "mongodb://127.0.0.1:27017/EMS";

// Connect to MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database is connected");
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
};
connectToDB();

// Design schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        set: (value) => value.trim(),
    },
    author: {
        type: String, // Corrected the typo here
        required: true,
        set: (value) => value.trim(),
    },
    price: {
        type: Number,
        required: true,
        set: (value) => Math.round(value * 100) / 100, // Corrected Math usage
    },
}, {
    timestamps: true, // Correct placement of timestamps
});

// Compile the schema to form the model
const Book = mongoose.model("Book", bookSchema);

const createDoc = async () => {
    try {
        const book = new Book({
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 14.99
        });
        const result = await book.save();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

createDoc();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
