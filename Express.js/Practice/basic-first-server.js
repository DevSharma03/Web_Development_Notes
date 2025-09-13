const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // here we do not need to specify the content type of the response
  // res.send('Hello World!');
  // res.send('<h1> Hello World </h1>');
  res.send({ message: "Hello World" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
