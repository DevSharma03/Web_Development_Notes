const bcrypt = require("bcryptjs");
const User = require("./models/userModel");

async function createUser() {
    const hashedPassword = bcrypt.hashSync("password", 10);
    const newUser = new User({ username: "devashish", password: hashedPassword });
    await newUser.save();
    console.log("User created");
}

createUser();
