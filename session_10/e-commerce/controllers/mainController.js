const {products} = require(".//adminController")
const Product = require("../models/Product");

const personInfo = {
    firstName: "Jack",
    lastName: "Sparrow",
    job: "Pirate"
}

const getHome = (req, res) => {
    res.render("index.ejs", {personInfo, pageTitle: "Home"});
}

const getAbout = (req, res) => {
    res.render("about.ejs", {pageTitle: "About"});
}

const getProducts = (req, res)=>{
    Product.find()
    .then(products => {
        console.log(products);
        res.render("products.ejs", {products, pageTitle: "Products"});
    })
    .catch(err => console.log(err))
}

module.exports = {getHome, getAbout, getProducts}