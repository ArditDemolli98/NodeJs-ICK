const Product = require("../models/Product");

const addProductView = (req, res) => {
    res.render("add-product.ejs", {pageTitle: "Add Product"});
}

const createProduct = (req, res) => {
    const {prodName, prodDesc, prodPrice} = req.body;

    const product = new Product({
        name: prodName,
        description: prodDesc,
        price: prodPrice
    })

    product.save()
    .then(result => {
        res.redirect("/admin/add-product");
    })
    .catch(err => console.log(err));
}

const editProductView = (req, res) => {
    const id =req.params.id;

    Product.findById(id)
    .then(product => {
        res.render("edit-product", {pageTitle:"Edit product", product});
    })
    .catch(err => console.log(err));
}

const updateProduct = (req, res) => {
    const {prodId, prodName, prodDesc, prodPrice} = req.body;
    // const prodId = req.body.prodId
    // const prodName = req.body.prodName
    // const prodDesc = req.body.prodDesc
    // const prodPrice = req.body.prodPrice
    Product.findById(prodId)
    .then(product => {
        product.name = prodName;
        product.description = prodDesc;
        product.price = prodPrice;
        return product.save();
    })
    .then(result => {
        res.redirect("/products");
    })
    .catch(error => console.log(error))
}

const deleteProduct = (req, res) => {
    const id = req.body.prodId;
    Product.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/products")
    })
    .catch(err => console.log(err))
}

module.exports = { addProductView, createProduct, editProductView, updateProduct, deleteProduct }