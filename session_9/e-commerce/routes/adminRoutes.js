const express = require("express");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res) => {
    res.render("add-product.ejs", {pageTitle: "Add Product"});
})

router.post("/add-product", (req, res, next) => {
    products.push(req.body);
    res.redirect("/admin/add-product");
})

exports.routes = router;
exports.products = products;
