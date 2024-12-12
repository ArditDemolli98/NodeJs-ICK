const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const isAuth = require("../middlewares/isAuth");
const {body} = require("express-validator");

router.get("/add-product", isAuth.adminProtection, adminController.addProductView)

router.post("/add-product", isAuth.adminProtection, 
    [
        body("prodName")
            .isString()
            .isLength({min: 3, max: 20}).withMessage("Name has to be between 3 and 20 characters long!")
            .trim().escape(),
        body("prodDesc")
            .isString()
            .isLength({ min: 5, max: 150 }).withMessage("Description has to be between 5 and 150 characters long!")
            .trim().escape(),
        body("prodPrice")
            .isFloat({min: 0}).withMessage("Price has to be a positive number!")

    ],
     adminController.createProduct)

router.get("/edit-product/:id", isAuth.adminProtection, adminController.editProductView)

router.post("/edit-product", isAuth.adminProtection,
    [
        body("prodName")
            .isString()
            .isLength({ min: 3, max: 20 }).withMessage("Name has to be between 3 and 20 characters long!")
            .trim().escape(),
        body("prodDesc")
            .isString()
            .isLength({ min: 5, max: 150 }).withMessage("Description has to be between 5 and 150 characters long!")
            .trim().escape(),
        body("prodPrice")
            .isFloat({ min: 0 }).withMessage("Price has to be a positive number!")

    ], 
    adminController.updateProduct)

router.post("/delete-product", isAuth.adminProtection, adminController.deleteProduct)

router.get("/my-products", isAuth.adminProtection, adminController.getMyProducts)

module.exports = router;

