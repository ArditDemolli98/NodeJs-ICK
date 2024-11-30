const Product = require("../models/Product");

const addProductView = (req, res) => {
    res.render("add-product.ejs", {pageTitle: "Add Product"});
}

const createProduct = (req, res) => {
    // products.push(req.body);
    const {prodName, prodDesc, prodPrice} = req.body;

    const product = new Product({
        name: prodName,
        description: prodDesc,
        price: prodPrice
    })

    product.save()
    .then(result => {
        console.log(result);
        res.redirect("/admin/add-product");
    })
    .catch(err => console.log(err));

}

module.exports = { addProductView, createProduct}