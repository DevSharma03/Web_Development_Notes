const http = require("http");
const url = require("url");
// define the handler
const handler = (req, res) => {
  // parse the url
    const parsedUrl = url.parse(req.url, true);
  // get the path from the url
    const queryParameter = parsedUrl.query;
    console.log(queryParameter);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the homepage!");
};
// create the server
const server = http.createServer(handler);
// start the server
server.listen(3000, () => {
    console.log("Server running on port 3000");
});