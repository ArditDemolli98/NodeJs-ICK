const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) =>{
    const url = req.url;
    if(url === "/about"){
        fs.readFile("views/about.html", function(err, data){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(data);
            res.end();
        })    
    } else if(url === "/contact") {
        fs.readFile("views/contact.html", function(err, data){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(data);
            res.end();
        })
    } else {
        fs.readFile("views/index.html", function(err, data){
            res.writeHead(200, {"Content-Type":"text/html"})
            res.write(data);
            res.end();
        })
    }
})

server.listen(8080);

// Optimized Version
/*
const server = http.createServer((req, res) =>{
    const url = req.url;
    res.writeHead(200, {"Content-Type":"text/html"})
    function readData(err, data){
        res.write(data);
        res.end();
    }
    if(url === "/about"){
        fs.readFile("views/about.html", readData)    
    } else if(url === "/contact") {
        fs.readFile("views/contact.html", readData)
    } else {
        fs.readFile("views/index.html", readData)
    }
})
*/