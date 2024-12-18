const Product = require("../models/Product");
const User = require("../models/User");
const {validationResult} = require("express-validator");

const getProducts = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const perPage = 6;
        const totalItems = await Product.find().countDocuments();
        const products = await Product.find()
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        res.status(200).json({
            message: "Fetched products successfully",
            products: products,
            totalItems: totalItems
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({_id: id, userId: req.userId});
        if(!product){
            res.status(404).json(`Product with id: ${id} doesn't exist!`);
        }else {
            res.status(200).json(product);
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0].msg;
            const error = new Error(errorMessage);
            error.statusCode = 422;
            throw error;
        }
        const prodName = req.body.name;
        const prodDesc = req.body.description;
        const prodPrice = req.body.price;

        const product = new Product({
            name: prodName,
            description: prodDesc,
            price: prodPrice,
            userId: req.userId
        })
        await product.save();
        const user = await User.findById(req.userId);
        user.products.push(product)
        await user.save();

        res.status(201).json({product, message: "Product created successfully!"});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0].msg;
            const error = new Error(errorMessage);
            error.statusCode = 422;
            throw error;
        }
        const id = req.params.id;
        const prodName = req.body.name;
        const prodDesc = req.body.description;
        const prodPrice = req.body.price;

        const product = await Product.findById(id);
        if (req.userId.toString() !== product.userId.toString()){
            const error = new Error("Not authorized!");
            error.statusCode = 401;
            throw error;
        }
        product.name = prodName;
        product.description = prodDesc;
        product.price = prodPrice;

        await product.save();
        res.status(200).json({product, message: "Product updated successfully!"});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        
        if(!product) {
            const error = new Error(`Product with id: ${id} doesn't exist!`);
            error.statusCode = 401;
            throw error;
        }
        if (req.userId.toString() !== product.userId.toString()) {
            const error = new Error("Not authorized!");
            error.statusCode = 401;
            throw error;
        }
        await product.deleteOne();
        const user = await User.findById(req.userId);
        user.products.pull(product);
        await user.save();
        res.status(200).json("Product deleted successfully!");
        
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }