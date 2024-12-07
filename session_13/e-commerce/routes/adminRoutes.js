const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")

router.get("/add-product", adminController.addProductView)

router.post("/add-product", adminController.createProduct)

router.get("/edit-product/:id", adminController.editProductView)

router.post("/edit-product", adminController.updateProduct)

router.post("/delete-product", adminController.deleteProduct)

module.exports = router;

