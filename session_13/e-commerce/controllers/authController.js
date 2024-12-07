const User = require("../models/User");

const getLoginView = (req, res) => {
    // const loggedIn = req.get("Cookie")?.split("=")[1];
    res.render("login", { 
        pageTitle: "Login", 
        isAuthenticated: req.session.loggedIn 
    });
}

const getRegisterView = (req, res) => {
    res.render("register", { 
        pageTitle: "Register", 
        isAuthenticated: req.session.loggedIn 
    });
}

const postLogin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        console.log(`User with email: ${email} doesn't exist`);
        return res.redirect("/login");
    }
    if(user.password !== password) {
        console.log(`Password incorrect!`);
        return res.redirect("/login");
    }

    req.session.loggedIn = true;
    req.session.user = user;
    // res.setHeader("Set-Cookie", "loggedIn=true");
    res.redirect("/");
}

const postRegister = (req, res) => {
    res.redirect("/login");
}

module.exports = { getLoginView, getRegisterView, postLogin, postRegister };