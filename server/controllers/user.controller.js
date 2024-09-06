const errorHandler = require("../utils/error");
const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

const test = (req, res) => {
    res.send('TESTING from controller;')
}

const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'Unauthorized'))
    console.log(req.body);
    
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                photoURL: req.body.photoURL
            }
        }, {new: true});
        console.log(updateUser)
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch (err) {
        next(err);
    }
}

exports.test = test;

exports.updateUser = updateUser;

