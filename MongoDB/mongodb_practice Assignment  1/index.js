// Import required modules
const express = require('express'); // Express is used to create the server and handle routes
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client for database interaction
const bodyParser = require('body-parser'); // Body-parser parses incoming JSON requests


// Initialize the Express app
const app = express();
const PORT = 5000; // Set the server port from the environment variable or default to 5000

// Middleware for parsing JSON data
app.use(bodyParser.json()); // Automatically parse JSON payloads in incoming requests

// MongoDB Atlas connection string
const uri = "mongodb+srv://devashishbsharma:Mongodb12@practicemodule.8cpdh.mongodb.net/PracticeModule1"; // Connection string from the .env file

// Create a MongoDB client
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Connect to the MongoDB database
async function connectToDatabase() {
    try {
        await client.connect(); // Establish the connection
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
}
connectToDatabase();

// Define the database and collection names
const dbName = 'sampleDB'; // Replace with your database name
const collectionName = 'items'; // Replace with your collection name
const db = client.db(dbName);
const collection = db.collection(collectionName);

// Route to add a new item to the database
app.post('/api/items', async (req, res) => {
    try {
    // Extract data from the request body
    const newItem = {
      name: req.body.name, // Item name
      description: req.body.description, // Item description
      createdAt: new Date(), // Set the creation date
    };

    // Insert the new item into the collection
    const result = await collection.insertOne(newItem);

    // Send the inserted item as a response
    res.status(201).json(result.ops[0]); // Respond with the newly created item
  } catch (err) {
    console.error('Error saving item:', err); // Log any errors that occur during saving
    res.status(500).json({ message: 'Internal Server Error' }); // Send an error response to the client
  }
});

// Route to retrieve all items from the database
app.get('/api/items', async (req, res) => {
  try {
    // Fetch all items from the collection
    const items = await collection.find().toArray();

    // Send the items as a response
    res.status(200).json(items); // Respond with the list of items
  } catch (err) {
    console.error('Error fetching items:', err); // Log any errors that occur during retrieval
    res.status(500).json({ message: 'Internal Server Error' }); // Send an error response to the client
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
});

// Notes:
// 1. Create a .env file in the root of your project and add your MongoDB Atlas connection string as MONGO_URI.
// 2. Use a tool like Postman or cURL to test the endpoints for adding and retrieving data.
// 3. Replace "sampleDB" and "items" with the names of your database and collection as needed.


