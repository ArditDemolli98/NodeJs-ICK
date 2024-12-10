const Product = require("../models/Product");

const addProductView = (req, res) => {
    res.render("admin/add-product.ejs", {
        pageTitle: "Add Product",
        isAuthenticated: req.session.loggedIn
    });
}

const createProduct = (req, res) => {
    const {prodName, prodDesc, prodPrice} = req.body;
    const product = new Product({
        name: prodName,
        description: prodDesc,
        price: prodPrice,
        userId: req.session.user._id
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
        res.render("admin/edit-product", {
            pageTitle:"Edit product", 
            product,
            isAuthenticated: req.session.loggedIn
        });
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

const getMyProducts = (req, res) => {
    console.log(req.session.user);
    Product.find({userId: req.session.user._id}).sort("-name")
        .then(products => {
            res.render("admin/my-products", {
                products, pageTitle: "My Products",
                isAuthenticated: req.session.loggedIn
            });
        })
        .catch(err => console.log(err))
}
module.exports = { addProductView, createProduct, editProductView, updateProduct, deleteProduct, getMyProducts }