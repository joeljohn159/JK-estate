const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/error.js");
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return next(errorHandler(400, 'Bad Request'))
    const hashedPassword = await bcryptjs.hashSync(password, 10)
    try {
        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save();
        res.json({ username, email, success: true })
    } catch (err) {
        next(errorHandler(500, err.message))
    }

}


const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, 'User Not Found!!!'))
        }
        const decryptedPassword = bcryptjs.compareSync(password, validUser.password);
        if (!decryptedPassword) {
            return next(errorHandler(401, 'Incorrect password'));
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWt_SECRET)
        res.cookie('access_token', token, { httpOnly: true })
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).json(rest)
    } catch (err) {
         next(errorHandler(500, err.message));
    }
};


const google = async (req, res, next) => {

    try {
        const email = req.body.email;
        const photoURL = req.body.photoURL;
        const user = await User.findOne({ email: email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // res.cookie('access_token', token, { httpOnly: true })
            const { password, ...rest } = user._doc;
            // res.status(200).json(rest);
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            // console.log(req.body)
            const username = await req.body.displayName.split(' ').join('') + Math.random().toString().slice(-4)
            const userPassword = Math.random().toString(32).slice(-5) + Math.random().toString(32).slice(-5)
            const hashedPassword = await bcryptjs.hashSync(userPassword, 10);
            const newUser = new User({ username, email, password: hashedPassword, photoURL })
            await newUser.save();
            
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password , ...rest } = newUser._doc;
            // res.status(200).json(rest);
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        }
    } catch (err) {
        next(errorHandler(500, err.message));
    }
}

exports.signUp = signUp;
exports.signIn = signIn;
exports.google = google;
