const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /api/products
router.get("/products", productController.getProducts);

// GET /api/products/{id}
router.get("/products/:id", productController.getProductById);

// POST /api/products
router.post("/products", productController.createProduct);

// PUT /api/products/{id}
router.put("/products/:id", productController.updateProduct);

// DELETE /api/products/{id}
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;