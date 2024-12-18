const Product = require("../models/Product");
const { validationResult } = require("express-validator");
const fs = require("fs");
const mongoose = require("mongoose");

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

const createProduct = (req, res, next) => {
    const {prodName, prodDesc, prodPrice} = req.body;
    const imagePath = req.file?.path;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        if(imagePath) {
            clearImage(imagePath);
        }
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
        imagePath: imagePath,
        userId: req.session.user._id
    })

    product.save()
    .then(result => {
        res.redirect("/admin/add-product");
    })
    .catch(err => {
        const error = new Error(err);
        error.statusCode = 500;
        next(error);
    });
}

const editProductView = (req, res, next) => {
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
    .catch(err => next(err));
}

const updateProduct = async (req, res, next) => {
    try {
        const { prodId, prodName, prodDesc, prodPrice } = req.body;
        const product = await Product.findById(prodId)
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
        if(req.file){
            clearImage(product.imagePath);
            product.imagePath = req.file.path;
        } else {
            product.imagePath = product.imagePath
        }
        await product.save();
        res.redirect("my-products");
    } catch (error) {
        next(error);
    }
}

const deleteProduct = (req, res, next) => {
    const id = req.body.prodId;
    Product.findByIdAndDelete(id)
    .then(result => {
        clearImage(result.imagePath);
        res.redirect("/products")
    })
    .catch(err => next(err))
}

const getMyProducts = (req, res, next) => {
    Product.find({userId: req.session.user._id}).sort("-name")
        .then(products => {
            res.render("admin/my-products", {
                products, pageTitle: "My Products",
                isAuthenticated: req.session.loggedIn
            });
        })
        .catch(err => next(err))
}

function clearImage(imagePath) {
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.log("Image couldn't be deleted " + err);
        }
    })
}



module.exports = { addProductView, createProduct, editProductView, updateProduct, deleteProduct, getMyProducts }