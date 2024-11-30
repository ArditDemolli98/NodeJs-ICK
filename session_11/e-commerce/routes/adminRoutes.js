const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/add-product", adminController.addProductView)

router.post("/add-product", adminController.createProduct)

module.exports = router;

