const express = require("express");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

const personInfo = {
    firstName: "Jack",
    lastName: "Sparrow",
    job: "Pirate"
}

const products = adminRoutes.products;

router.get("/", (req, res) => {
    res.render("index.ejs", {personInfo, pageTitle: "Home"});
})

router.get("/about", (req, res) => {
    res.render("about.ejs", {pageTitle: "About"});
})

router.get("/products", (req, res)=>{
    res.render("products.ejs", {products, pageTitle: "Products"});
})

module.exports = router;