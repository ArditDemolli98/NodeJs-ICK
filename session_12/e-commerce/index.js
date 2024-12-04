const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
require("dotenv").config({path: ".env"})

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_URI)
.then(result => {
    console.log("Connected to the database");
})
.catch(err => console.log(err));

app.use(mainRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).render("error.ejs", {pageTitle: "Page not found"})
})

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running here: http://localhost:${PORT}`);
    }
})