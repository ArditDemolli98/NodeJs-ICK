const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const isAuth = require("../middlewares/isAuth");

router.get("/add-product", isAuth.adminProtection, adminController.addProductView)

router.post("/add-product", isAuth.adminProtection, adminController.createProduct)

router.get("/edit-product/:id", isAuth.adminProtection, adminController.editProductView)

router.post("/edit-product", isAuth.adminProtection, adminController.updateProduct)

router.post("/delete-product", isAuth.adminProtection, adminController.deleteProduct)

router.get("/my-products", isAuth.adminProtection, adminController.getMyProducts)

module.exports = router;

