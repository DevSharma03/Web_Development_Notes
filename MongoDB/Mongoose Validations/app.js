const express = require('express');
const mongoose = require("mongoose");
const validator = require('validator');
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

// Design schema with builtin validations 
// const userProplileSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Username is required'],
//         minlength: 3,
//         maxlength: 50,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
//     },
//     age: {
//         type: Number,
//         required: [true, 'Age is required'],
//         min: 18,
//         max: 99,
//     },
//     gender: {
//         type: String,
//         enum: ['Male', 'Female', 'Other'],
//         default: 'other',
//     }
// },
// {
//     timestamps: true,
// });

// compile the scheema to form the model 
// const User = mongoose.model("User", userProplileSchema);

// const createDoc = async () => {
//     try {
//         const user = new User({
//             username: "JohnDoe",
//             email: "johndoe@gmail.com",
//             age: 25,
//             gender: "Male",
//             });
//             const result = await user.save();
//             console.log(result);
            
//     } catch (error) {
//         console.log(error);
//         }
// }

// createDoc();



// custom validation
// required should be true if you want to create a custom validation object
// const userProplileSchema = new mongoose.Schema({
//         username: {
//             type: String,
//             required: [true, 'Username is required'],
//             validate: {
//                 validator: function(value) {
//                     return /^[a-zA-Z0-9]+$/.test(value);
//                 },
//                 message: 'Username can only contain alphanumeric characters'
//             }
//             // this is the custom validation where i have wrote a function for some specific validation
//         },
//         email: {
//             type: String,
//             required: [true, 'Email is required'],
//             unique: true,
//             match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
//             validate: {
//                 validator: function(value) {
//                     return value.endsWith("@gmail.com")
//                 },
//                 message: "mail shoudl ends with @gmail.com"
//             }
//         }
//     },
//     {
//         timestamps: true,
//     });

//     const User = mongoose.model("User", userProplileSchema);

//     const createDoc = async () => {
//         try {
//             const user = new User({
//                 username: "DEV",
//                 email: "johndoe@gmail.com"
//                 });
//                 const result = await user.save();
//                 console.log(result);
                
//         } catch (error) {
//             console.log(error);
//             }
//     }
    
//     createDoc();



// third party validator
const userProplileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Username can only contain alphanumeric characters'
        }
        // this is the custom validation where i have wrote a function for some specific validation
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        validate: {
            validator: function(value) {
                return this.validator.isEmail(value);
            },
            message: 'Enter a valid mail'
            // this is a third party validation 
        }
    },
    age: {
        type: Number,
        required: [true, 'age is required'],
        validate: {
            validator: function(value) {
                return this.validator.isInt(value, {min: 0, max: 80});
            },
            message: 'Enter a valid age'
        }
    },
},
{
    timestamps: true,
});

const User = mongoose.model("User", userProplileSchema);

const createDoc = async () => {
    try {
        const user = new User({
            username: "Hello" ,
            email: "johndoe@gmail.com", 
            age: 25,
            });
            const result = await user.save();
            console.log(result);
            
    } catch (error) {
        console.log(error);
        }
}

createDoc();




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});