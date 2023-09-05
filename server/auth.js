const jwt = require('jsonwebtoken');
const register = require("./models/User");
const baseURL = "http://localhost:8000"
// const baseURL = "https://chat-sphere-381410.el.r.appspot.com"
require('dotenv').config()

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        // console.log(token)
        const verifyUser = jwt.verify(token, process.env.ACCESS_TOKEN);

        const user = await register.findOne({ _id: verifyUser._id });
        console.log(user, "user")


        if (verifyUser == null)
            return res.status(400).json({
                message: {
                    header: 'Account does not exists',
                    desc: 'Sign up to continue'
                }
            })
        req.user = user;
        req.accessToken = token
        next();
    } catch (error) {
        console.log("Missing token")
        return res.status(400).json({
            message: "Sign in to continue"
        })
    }
}

module.exports = { auth, baseURL };