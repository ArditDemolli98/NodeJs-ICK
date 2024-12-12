const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const addProductView = (req, res) => {
    res.render("admin/add-product.ejs", {
        pageTitle: "Add Product",
        isAuthenticated: req.session.loggedIn,
        error: "",
        oldInput: {
            name: "",
            description: "",
            price: "",
        }
    });
}

const createProduct = (req, res) => {
    const {prodName, prodDesc, prodPrice} = req.body;
    console.log(req.file);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(422).render("admin/add-product", {
            pageTitle: "Add Product",
            isAuthenticated: req.session.loggedIn,
            error: errorMessage,
            oldInput: {
                name: prodName,
                description: prodDesc,
                price: prodPrice,
            }
        })
    }

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
            error: "",
            isAuthenticated: req.session.loggedIn
        });
    })
    .catch(err => console.log(err));
}

const updateProduct = (req, res) => {
    const {prodId, prodName, prodDesc, prodPrice} = req.body;

    Product.findById(prodId)
    .then(product => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0].msg;
            return res.status(422).render("admin/edit-product", {
                pageTitle: "Edit Product",
                isAuthenticated: req.session.loggedIn,
                error: errorMessage,
                product
            })
        }
        product.name = prodName;
        product.description = prodDesc;
        product.price = prodPrice;
        return product.save();
    })
    .then(result => {
        res.redirect("my-products");
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