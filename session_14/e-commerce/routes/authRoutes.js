const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require("../middlewares/isAuth");
const { body } = require("express-validator");

router.get("/login", isAuth.authProtection, authController.getLoginView);

router.get("/register", 
    isAuth.authProtection,
    
    authController.getRegisterView);

router.post("/login", authController.postLogin);

router.post(
    "/register", 
    body('email').isEmail().withMessage("Enter a valid email!"),
    authController.postRegister
);

router.post("/logout", authController.postLogout);

module.exports = router;