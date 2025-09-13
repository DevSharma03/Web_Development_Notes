// createing a simple routing server for other pages using express.js
const express = require('express');
const path = require('path');
const app = express();

// app.get() is used to send the file to the client at the frontend when the user requests the page (home page  or about page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "public", 'about.html'));
}); 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});