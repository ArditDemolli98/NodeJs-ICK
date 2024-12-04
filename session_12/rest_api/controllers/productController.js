const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort("price");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json(`Product with id: ${id} doesn't exist!`);
        }else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createProduct = async (req, res) => {
    try {
        const prodName = req.body.name;
        const prodDesc = req.body.description;
        const prodPrice = req.body.price;

        if(!prodName || !prodPrice) {
            return res.status(400).json({message: "Name and price are required!"});
        }

        const product = new Product({
            name: prodName,
            description: prodDesc,
            price: prodPrice
        })
        await product.save();

        res.status(201).json({product, message: "Product created successfully!"});

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const prodName = req.body.name;
        const prodDesc = req.body.description;
        const prodPrice = req.body.price;

        const product = await Product.findById(id);

        if(prodName) {
            product.name = prodName;
        }
        if(prodDesc) {
            product.description = prodDesc;
        }
        if(prodPrice) {
            product.price = prodPrice;
        }
        await product.save();

        res.status(200).json({product, message: "Product updated successfully!"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product) {
            res.status(404).json(`Product with id: ${id} doesn't exist!`);
        }else{
            // await Product.findByIdAndDelete({_id: id});
            await product.deleteOne();
            res.status(200).json("Product deleted successfully!");
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }