const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLoginView);

router.get("/register", authController.getRegisterView);

router.post("/login", authController.postLogin);

router.post("/register", authController.postRegister);

module.exports = router;