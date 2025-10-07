const express = require('express');
const mongoose = require("mongoose")
const PORT = 3000;
const app = express();

url = "mongodb://127.0.0.1:27017/EMS";
// connect to mongoose 
const connectToDB = async () =>{
    try {
        await mongoose.connect(url);
        console.log("DataBase is connected")
    } catch (error) {
        console.log("Error connecting to mongodb ${error}");
    }
}

connectToDB();

// Design schema 
const userProplileSchema = new mongoose.Schema({
    username: String,
    age: Number,
    birthday: Date,
    isActive: Boolean, 
    hobbies: [string],
    objectId: mongoose.Schema.Types.ObjectId, 
    address:{
        street: string,
        city: String, 
        postCode: Number,
    }, //Embed
    customData: mongoose.Schema.Types.Mixed,
});

// compile the scheema to form the model 
const User = mongoose.model("User", userProplileSchema);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});