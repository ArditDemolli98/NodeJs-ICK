const express = require("express");
const path = require("path");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
})

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "about.html"));
})

router.get("/products", (req, res)=>{
    res.json(adminRoutes.products);
})

module.exports = router;