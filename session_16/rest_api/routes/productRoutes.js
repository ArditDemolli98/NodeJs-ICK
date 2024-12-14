const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAuth = require("../middlewares/isAuth");

// GET /api/products
router.get("/products", isAuth ,productController.getProducts);

// GET /api/products/{id}
router.get("/products/:id", isAuth, productController.getProductById);

// POST /api/products
router.post("/products", isAuth, productController.createProduct);

// PUT /api/products/{id}
router.put("/products/:id", isAuth, productController.updateProduct);

// DELETE /api/products/{id}
router.delete("/products/:id", isAuth, productController.deleteProduct);

module.exports = router;