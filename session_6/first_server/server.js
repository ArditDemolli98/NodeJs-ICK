const http = require("http");

http.createServer((request, response) => {
    console.log(request.url);
    console.log(request.method);
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello World</h1>");
    response.end();
}).listen(8000);
