const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/User");
const isAuth = require("../middlewares/isAuth");
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

router.get("/login", isAuth.authProtection, authController.getLoginView);

router.get("/register", isAuth.authProtection, authController.getRegisterView);

router.post("/login",
    [
        body('email')
            .isEmail().withMessage("Enter a valid email!")
            .normalizeEmail()
            .custom(async (email, {req}) => {
                const userExists = await User.findOne({ email: email });
                if (!userExists) {
                    throw new Error(`User with email: ${email} doesn't exist`);
                }
                req.user = userExists;
                return true;
            })
            ,
        body('password')
            .trim().escape()
            .isLength({ min: 6, max: 15 }).withMessage("Password has to be between 6 and 15 characters long!")
            .isAlphanumeric().withMessage("Password has to be alphanumeric!")
            .custom(async (password, {req}) => {
                const hasMatched = await bcrypt.compare(password, req.user.password);
                if(!hasMatched) {
                    throw new Error("Password incorrect!");
                }
                return true;
            }),
    ],
    authController.postLogin
);

router.post(
    "/register", 
    [
        body('username')
            .isLength({min: 6, max: 15}).withMessage("Username has to be between 6 and 15 characters long!")
            .isAlphanumeric().withMessage("Enter only letters, numbers or these characters ('.', '*', '&')!")
            .trim().escape(),
        body('email')
            .isEmail().withMessage("Enter a valid email!")
            .normalizeEmail()
            .custom(async (email) => {
                const userExists = await User.findOne({ email: email });
                if(userExists) {
                    throw new Error(`User with email: ${email} already exists`);
                }
                return true;
            }),
        body('password')
            .trim().escape()
            .isLength({ min: 6, max: 15 }).withMessage("Password has to be between 6 and 15 characters long!")
            .isAlphanumeric().withMessage("Password has to be alphanumeric!"),
        body('confirmPassword')
            .trim().escape()
            .custom((value, {req}) => {
                if(value !== req.body.password) {
                    throw new Error("Password didn't match with confirm password!")
                }
                return true;
            })
    ], 
    authController.postRegister
);

router.post("/logout", authController.postLogout);

module.exports = router;