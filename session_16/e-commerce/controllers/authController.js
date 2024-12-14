const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const getLoginView = (req, res) => {
    res.render("auth/login", { 
        pageTitle: "Login", 
        isAuthenticated: req.session.loggedIn,
        error: "" ,
        oldInput: {
            email: ""
        }
    });
}

const getRegisterView = (req, res) => {
    res.render("auth/register", {
        pageTitle: "Register",
        isAuthenticated: req.session.loggedIn,
        error: "",
        oldInput: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
}

const postLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0].msg;
            return res.status(422).render("auth/login", {
                pageTitle: "Login",
                isAuthenticated: req.session.loggedIn,
                error: errorMessage,
                oldInput: {
                    email: email,
                }
            });
        }

        req.session.loggedIn = true;
        req.session.user = req.user;
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const postRegister = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            const errorMessage = errors.array()[0].msg;
            return res.status(422).render("auth/register", {
                pageTitle: "Register",
                isAuthenticated: req.session.loggedIn,
                error: errorMessage,
                oldInput: {
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: req.body.confirmPassword
                }
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        await newUser.save();
        req.session.loggedIn = true;
        req.session.user = newUser;
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const postLogout = (req, res) => {
    req.session.destroy(err=>{
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
}

module.exports = { getLoginView, getRegisterView, postLogin, postRegister, postLogout };