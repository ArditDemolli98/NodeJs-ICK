const Product = require("../models/Product");

const personInfo = {
    firstName: "Jack",
    lastName: "Sparrow",
    job: "Pirate"
}

const getHome = (req, res) => {
    console.log(req.user);
    res.render("index.ejs", { 
        personInfo,
        pageTitle: "Home",
        isAuthenticated: req.session.loggedIn
    });
}

const getAbout = (req, res) => {
    res.render("about.ejs", { 
        pageTitle: "About",
        isAuthenticated: req.session.loggedIn 
    });
}

const getProducts = (req, res)=>{
    Product.find().sort("-name")
    .then(products => {
        res.render("products.ejs", { 
            products, pageTitle: "Products", 
            isAuthenticated: req.session.loggedIn
        });
    })
    .catch(err => console.log(err))
}

const getProductDetails = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
    .then(product => {
        res.render("product-details", { 
            pageTitle: "Product details", 
            product, 
            isAuthenticated: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = { getHome, getAbout, getProducts, getProductDetails }