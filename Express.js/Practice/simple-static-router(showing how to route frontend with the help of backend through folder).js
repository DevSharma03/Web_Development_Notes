// createing a simple routing server for other pages using express.js
const express = require('express');
const path = require('path');
const app = express();

// setting up the static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// this helps to route the pages using express.js (acually it uses the folder as static folder so whateven inside the folder will be served as static files means i can just use the name of the files in url with the .html to render them without using if else multiple times for example if i have 10 pages then i have to write 10 if else statements to route them but this is a simple way to do it using express.js and static folder so we can use the folder as static folder and then we can route the pages using express.js) 
// can check the simple-router-pages.js file for the pages that are being routed using this server and also check the public folder for the files that are being served as static files.