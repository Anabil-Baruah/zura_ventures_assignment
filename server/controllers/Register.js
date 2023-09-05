const user = require('../models/User')
require('dotenv').config()
const bcrypt = require('bcrypt')

const RegisterUser = async (req, res) => {
    const password = req.body.password
    const username = req.body.username
    const userExist = await user.findOne({ username })

    if (userExist) {
        const passwordMatch = await bcrypt.compare(password, userExist.password)
        if (!passwordMatch) {
            return res.status(400).json({
                type: 'error',
                message: { message: "Wrong password" }
            })
        }
        const token = await userExist.accessToken;
        res.cookie("jwt", token, {
            httpOnly: true
        });

        return res.status(200).json({
            type: 'Success',
            message: { message: `Welcome ${username}`, accessToken: userExist.accessToken }

        })
    }
    const newUser = new user({
        username: username,
        password: password,
    })
    //generating token
    const token = await newUser.generateAuthToken();
    newUser.accessToken = token

    res.cookie("jwt", token, {
        httpOnly: true
    });
    const result = await newUser.save()

    if (result) {
        res.status(200).json({
            type: 'success',
            message: { message: 'Account created successfully', accessToken: token }
        })
    }
    else {
        res.status(400).json({
            type: 'error',
            message: {
                header: 'Sorry !!!',
                desc: 'Some error occured please try later'
            }
        })
    }
}

module.exports = {
    RegisterUser,
};