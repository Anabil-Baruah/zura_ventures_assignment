const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    createdAt: {
        type: String,
        default: Date.now
    },
    accessToken: String
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN);
        this.accessToken = token
        await this.save();
        return token;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = mongoose.model("user", userSchema)