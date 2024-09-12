const errorHandler = require("../utils/error");
const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

const test = (req, res) => {
    res.send('TESTING from controller;')
}

const updateUser = async (req, res, next) => {
    if (req.user.id != req.params.id) return next(errorHandler(401, 'Unauthorized'))
    
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

const deleteUser = async (req, res, next) => {
    if(req.params.id != req.user.id ) next(errorHandler(403, 'Unauthorized'));
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id)
        console.log(deleteUser);
        res.clearCookie('access_token');
        res.status(204).json('User has been deleted succesfully');
        
    } catch (error) {
        next(error);
    }

}

    

exports.test = test;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;


