const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/about", (req, res)=>{
    res.sendFile(__dirname + "/views/about.html");
})

app.get("/contact", (req, res)=>{
    res.sendFile(__dirname + "/views/contact.html");
})

app.use((req, res)=>{
    res.sendFile(__dirname + "/views/error.html");
})

app.listen(8000)
