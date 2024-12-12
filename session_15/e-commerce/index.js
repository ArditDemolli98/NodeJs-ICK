const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
require("dotenv").config({path: ".env"})
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");

const app = express();
const PORT = 8000;
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "sessions"
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

mongoose.connect(process.env.DB_URI)
    .then(result => {
        console.log("Connected to the database");
    })
    .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
// app.use(multer({ dest: 'images' }).single('prodImage'));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('prodImage'));
app.set("view engine", "ejs");


app.use(session({
    secret: "Innovation Center of Kosovo",
    resave: false,
    saveUninitialized: false,
    store: store
}))

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