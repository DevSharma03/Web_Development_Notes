const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = 3000;

// MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/EMS";

// Create the MongoDB client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1, // Correct the version using ServerApiVersion.v1
        strict: true,
        deprecationErrors: true
    }
});

// Function to connect to the database
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db("PracticeModule1")
        // name of database i want to create inside the url 
        // const employees = database.collection("employees");
        const books = database.collection("books");
        // content folder name inside the database

        // const booksDocs = [
        //     { title: "Book 1", year: 2014, author: "Author 1" },
        //     { title: "Book 2", year: 2019, author: "Author 2" },
        //     { title: "Book 3", year: 2010, author: "Author 3" },
        //     { title: "Book 4", year: 2004, author: "Author 4" },
        //     { title: "Book 5", year: 2015, author: "Author 5" },
        // ]

        // const employeeDocs = [
        //     {name: "Dev", age: 21, department: "HR"},
        //     {name: "John", age: 30, department: "IT"},
        //     {name: "Jane", age: 28, department: "HR"},
        //     {name: "Bob", age: 22, department: "Operations"},
        //     {name: "Eva", age: 24, department: "Finance"},
        //     {name: "Jimmi", age: 28, department: "IT"},
        // ];
        // // Insert the documents into the employees collection
        // const results = await employees.insertMany(employeeDocs);

        // const results = await books.insertMany(Docs);

        // Query Operators 
        // $gt
        // const employeesCursor = await employees.find({age: {$gt: 21}})
        // const results = await employeesCursor.forEach((doc) => console.log(doc)); // can also use the toArray() method here as .toArray() at the place of forEach()
        // const results2 = await employeesCursor.toArray()  Like this 

        // $gte
        // const employeesCursor = await employees.find({age: {$gte: 21}})
        // const results = await employeesCursor.toArray();

        // $ne
        // const employeesCursor = await employees.find({age: {$ne: 21}})
        // const results = await employeesCursor.toArray();

        // $lt
        // const employeesCursor = await employees.find({age: {$lt: 21}})
        // const results = await employeesCursor.toArray();

        // $lte
        // const employeesCursor = await employees.find({age: {$lte: 21}})
        // const results = await employeesCursor.toArray();

        // $nin
        // const employeesCursor = await employees.find({age: {$nin: [21, 22]}} );
        // const results = await employeesCursor.toArray();

        // Multiple conditions
        // const employeesCursor = await employees.find({age: {$gt: 21, $lte: 30} });
        // const results = await employeesCursor.toArray();

        //logical operators
        // or
        // const employeesCursor = await books.find({$or: [{author: "Author 3"}, {year: {$lt: 2012}}]}); // it works like if one is true then the one will get print like or operator 
        // const results = await employeesCursor.toArray();

        //and 
        // const employeesCursor = await books.find({$and: [{author: "Author 3"}, {year: {$lt: 2012}}]}); // it works like if one is true then the one will print false like and operator 
        // const results = await employeesCursor.toArray();

        // nor
        // const employeesCursor = await books.find({$nor: [{author: "Author 3"}, {year: {year: 2012}}]}); 
        // const results = await employeesCursor.toArray();

        console.log(results);

    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
};

// Start the server and connect to MongoDB
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectDB(); // Ensure MongoDB is connected before the server starts accepting requests
});
