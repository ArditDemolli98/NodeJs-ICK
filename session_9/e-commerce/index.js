const express = require("express");
const path = require("path");
const mainRoutes = require("./routes/mainRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// app.get("/", (req, res, next) => {
//    console.log("Demonstrating next()");
//    next();
// })

app.use(mainRoutes);
app.use("/admin", adminRoutes.routes);

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