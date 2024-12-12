const authProtection =  (req, res, next) => {
    if(req.session.loggedIn){
        console.log("You are already logged in!");
        res.redirect("/");
    } else {
        next();
    }
}

const adminProtection = (req, res, next) => {
    if (!req.session.loggedIn) {
        console.log("You cannot access this page without being logged in!");
        res.redirect("/login");
    } else {
        next();
    }
}

module.exports = {authProtection, adminProtection};