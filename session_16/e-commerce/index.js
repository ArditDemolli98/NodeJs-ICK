const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
require("dotenv").config({path: ".env"})
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multerConfig = require("./middlewares/multerConfig");


const app = express();
const PORT = 8000;
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "sessions"
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect(process.env.DB_URI)
    .then(result => {
        console.log("Connected to the database");
    })
    .catch(err => console.log(err));

app.use(session({
    secret: "Innovation Center of Kosovo",
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(multerConfig);

app.use(mainRoutes);
app.use("/admin", adminRoutes);
app.use(authRoutes);

app.use((req, res) => {
    res.status(404).render("main/error", { 
        pageTitle: "Page not found", 
        isAuthenticated: req.session.loggedIn 
    })
})

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is running here: http://localhost:${PORT}`);
    }
})