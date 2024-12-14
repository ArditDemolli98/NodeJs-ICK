const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const userExists = await User.findOne({email: email});
        if(userExists) {
            return res.status(409).json({message: "User already exists"});
        }
        const hashedPwd = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPwd
        })
        await user.save();

        res.status(201).json({message: "User created!"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({email:email});
        if(!userExists) {
            return res.status(404).json({message: "User with this email doesn't exist!"});
        }

        const hasMatched = await bcrypt.compare(password, userExists.password);
        if (!hasMatched) {
            return res.status(401).json({ message: "Wrong password!" });
        }
        const token = jwt.sign(
            {
                email: userExists.email,
                userId: userExists._id.toString()
            },
            'somesupersecretstringhere',
            {
                expiresIn: "1h"
            }
        )
        res.status(200).json({token: token, userId: userExists._id.toString(), message: "Logged in successfully"},);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports = {signup, login};