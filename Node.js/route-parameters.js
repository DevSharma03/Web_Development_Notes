const http = require("http");
const url = require("url");
// define the handler
const handler = (req, res) => {
  // parse the url
  const parsedUrl = url.parse(req.url, true);
  // get the path from the url
  const pathname = parsedUrl.pathname;
  // split the pathname into components
  const pathComponents = pathname.split("/").filter(Boolean);
  console.log(pathComponents);
  if (pathComponents[0] === "products" && pathComponents[1]) {
    // get the product id from the path
    const productId = pathComponents[1];
    // send the response to user
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Product id: ${productId}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

// create the server
const server = http.createServer(handler);
// start the server
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
