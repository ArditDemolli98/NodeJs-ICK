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
    Product.find().sort("-name")
    .then(products => {
        res.render("products.ejs", {products, pageTitle: "Products"});
    })
    .catch(err => console.log(err))
}

const getProductDetails = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
    .then(product => {
        res.render("product-details", {pageTitle: "Product details", product});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = { getHome, getAbout, getProducts, getProductDetails }