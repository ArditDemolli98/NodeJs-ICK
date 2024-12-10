const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");



const getLoginView = (req, res) => {
    // const loggedIn = req.get("Cookie")?.split("=")[1];
    res.render("auth/login", { 
        pageTitle: "Login", 
        isAuthenticated: req.session.loggedIn,
        error: req.flash("error") 
    });
}

const getRegisterView = (req, res) => {
    res.render("auth/register", { 
        pageTitle: "Register", 
        isAuthenticated: req.session.loggedIn,
        error: req.flash("error"),

    });
}

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            // console.log(`User with email: ${email} doesn't exist`);
            req.flash("error", `User with email: ${email} doesn't exist`)
            return res.redirect("/login");
        }

        const hasMatched = await bcrypt.compare(password, user.password);

        if (!hasMatched) {
            // console.log(`Password incorrect!`);
            req.flash("error", "Password incorrect!");
            return res.redirect("/login");
        }

        req.session.loggedIn = true;
        req.session.user = user;
        // res.setHeader("Set-Cookie", "loggedIn=true");
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
            return res.render("auth/register", {
                pageTitle: "Register",
                isAuthenticated: req.session.loggedIn,
                error: errorMessage,
            });
        }

        if(!email){
            req.flash("error", "Please enter an email!");
            return res.redirect("/register");
        }
        const userExists = await User.findOne({email: email});
        if(userExists){
            // console.log(`User with email: ${email} already exists`);
            req.flash("error", `User with email: ${email} already exists`);
            return res.redirect("/register");
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