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
    hobbies: [String],
    objectId: mongoose.Schema.Types.ObjectId, 
    address:{
        street: String,
        city: String, 
        postCode: Number,
    }, //Embed
    customData: mongoose.Schema.Types.Mixed,
});

// compile the scheema to form the model 
const User = mongoose.model("User", userProplileSchema);

// CRUD Operations
// Create Doc
// .save()
// const newUser = new User({
//     username: 'John Doe',
//     age: 20,
//     birthday: new Date('2004-01-01'),
//     isActive: true, 
//     hobbies: ['reading', 'painting'],
//     address:{
//         street: '123 Main St',
//         city: 'New York', 
//         postCode: 10001,
//     }, //Embed
//     customData: {
//         favoriteColor: 'blue',
//         favoriteNumber: 42,
//     },
// });

// // save the document 
// newUser
// .save()
// .then((data)=>{console.log(data);})
// .catch((e)=> console.log(e));


// .create()
// User.create({
//     username: 'Jane Doe',
//     age: 20,
//     birthday: new Date('2004-01-01'),
//     isActive: true, 
//     hobbies: ['reading', 'painting'],
//     address:{
//         street: '123 Main St',
//         city: 'New York', 
//         postCode: 10001,
//     }, //Embed
//     customData: {
//         favoriteColor: 'blue',
//         favoriteNumber: 42,
//     },
// }).then((data)=>{console.log(data);})
// .catch((e)=> console.log(e));


// insertMany()
// User.insertMany([{
//     username: 'Random 1',
//     age: 20,
//     birthday: new Date('2004-01-01'),
//     isActive: true, 
//     hobbies: ['reading', 'painting'],
//     address:{
//         street: '123 Main St',
//         city: 'New York', 
//         postCode: 10001,
//     }, //Embed
//     customData: {
//         favoriteColor: 'blue',
//         favoriteNumber: 42,
//     },
// },
// {
//     username: 'Random 2',
//     age: 20,
//     birthday: new Date('2004-01-01'),
//     isActive: true, 
//     hobbies: ['reading', 'painting'],
//     address:{
//         street: '123 Main St',
//         city: 'New York', 
//         postCode: 10001,
//     }, //Embed
//     customData: {
//         favoriteColor: 'blue',
//         favoriteNumber: 42,
//     },
// },
// {
//     username: 'Random 3',
//     age: 20,
//     birthday: new Date('2004-01-01'),
//     isActive: true, 
//     hobbies: ['reading', 'painting'],
//     address:{
//         street: '123 Main St',
//         city: 'New York', 
//         postCode: 10001,
//     }, //Embed
//     customData: {
//         favoriteColor: 'blue',
//         favoriteNumber: 42,
//     },
// },
// ])
// .then((data)=>{console.log(data);})
// .catch((e)=> console.log(e));



// Read operations 
// find()
// User.find()
//     .then((data)=>{console.log(data);})
//     .catch((e)=> console.log(e));


//  findOne()
// User.findOne({
//     age: 20,
//     username: "john Doe" 
// this will only return the first data of the age given if there are many (also can use many variables here like username and age at a time or more like that)
// })
//     .then((data)=>{console.log(data);})
//     .catch((e)=> console.log(e));


// findByID()
// User.findById("678c2c904ebfa82f8cde6ab9")
//     .then((data)=>{console.log(data);})
//     .catch((e)=> console.log(e));



// .where(), .sort() and .limit()
// const findUsers = async ()=>{
//     try {
//         const users = await User.find()
//             .where('age').gte(20) // will return all users whose age is greater than or equal to 20
//             .sort('-age') // will sort users in descending order by age
//             .limit(1) // will limit the number of users returned to 10
//             console.log(users);
//     } catch (error) {
//         console.log(error);
//     }
// };
// findUsers();



// Update operations and Update Operators
// updateOne()
// const updateDoc = async ()=>{
//     try {
//         const updatedUser = await User.updateOne(
//             {username: "John Doe"},
//             {
//             
//                     age: 21,
//                     isActive: false,
//                 
//             }
//         );
//         console.log(updatedUser);
//     } catch (error) {
//         console.log(error);
//     }
// };
// updateDoc();


// findByIdAndUpdate()
// const updateDoc = async ()=>{
//     try {
//         const updatedUser = await User.updateOne(
//             678c2c904ebfa82f8cde6ab9,
//             {
//                 $set: {
//                     age: 21,
//                     isActive: false,
//                 },
//                 $push: {
//                     hobbies: "cooking"
//                 }
//             }
//         );
//         console.log(updatedUser);
//     } catch (error) {
//         console.log(error);
//     }
// };
// updateDoc();


// findOneandUpdate()
// const updateDoc = async ()=>{
    //     try {
    //         const updatedUser = await User.findOneAndUpdate(
    //             {username: "John Doe"},
    //             {
    //                 $set: {
    //                     age: 21,
    //                     isActive: false,
    //                 },
    //                 $push: {
    //                     hobbies: "cooking"
    //                 }
    //             },
    //             {new: true} // return the updated document
    //         );
    //         console.log(updatedUser);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // updateDoc();















app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});