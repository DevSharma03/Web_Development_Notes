const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = 3000;

// MongoDB connection string
const uri = "mongodb+srv://devashishbsharma:Mongodb12@practicemodule.8cpdh.mongodb.net/PracticeModule1";

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

        // Creating DataBase
        // 1. DataBase Name (college)
        const database = client.db('College');
        // 2. Collection (students)
        const students = database.collection('students');

        // CRUD Operations
        // 3. Create Operation  documents() using the insertOne() method
        // const result = await students.insertOne({
        //     name: 'John Doe',
        //     age: 20,
        //     email: 'johndoe@example.com',
        // });

        //3. Create Operation documents() using the insertMany() Method
        // const result2 = await students.insertMany([
        //     {
        //         name: 'Jane Doe',
        //         age: 22,
        //         email: 'janedoe@example.com',
        //     },
        //     {
        //         name: 'Bob Smith',
        //         age: 25,
        //         email: 'bobsmith@example.com',
        //     }
        // ]);


        //4. Read Operation
        // Find() All
        // const resultCursor = students.find();
        // // Cursor is the data we do not the data in string format, we get it in cursor format so we have to convert it into string/array format later on.
        // const result = await resultCursor.toArray();

        // FindOne()
        // const result = await students.findOne({
        //     name: 'John Doe',
        // });
        // this findOne() will give you the data of all the same keyword element by which it was searched in here eg. above i searched as name so i will get the specific name person buut if i search by age it will give me all the persons with that age


        //5. Update Operations
        // updateOne()
        // const result = await students.updateOne({
        //     name: 'John Doe', // Filtering the object we want to udate 
        //     }, 
        //     {
        //     $set: {
        //             age: 21
        //         }
        //     });

        // UpdateMany()
        // const result = await students.updateMany({
        //     name: 'John Doe',
        //     },
        //     {
        //     $set: {
        //         age: 24,
        //         }
        //     });

        //FindOneAndUpdate() ( this update the document or object and return the updated object as result in terminal )
        // const result = await students.findOneAndUpdate({
        //     name: 'John Doe',
        //     },
        //     {
        //         $set: {
        //             age: 21
        //             }
        //     });


        //6. Delete Operations
        //deleteOne()
        // const result = await students.deleteOne({
        //     name: 'John Doe',
        //     });

        // deleteMany()
        // const result = await students.deleteMany({
        //     name: 'John Doe',
        //     });
        // can use the keyword to delete multiple objects at once using this 

        // FindOneAndDelete()
        // const result = await students.findOneAndDelete({
        //     name: 'John Doe',
        //     });
        // use to specifically find one and delete it 



        







        console.log(result);
    } catch (err) {
        console.log('Error connecting to MongoDB:', err);
    }
};

// Start the server and connect to MongoDB
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await connectDB(); // Ensure MongoDB is connected before the server starts accepting requests
});
