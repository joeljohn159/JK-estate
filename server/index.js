const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter  = require('./routes/user.route')
const authRouter  = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MONGO Connected")
}).catch(err=>{
    console.log("ERROR =====",err)
})



const app = express();

app.use(express.json());
app.use(cookieParser())

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.listen(3000, ()=>{
    console.log("SERVER running in Port : 3000")
})


app.use('/api/user', userRouter);

app.use('/api/auth',authRouter );

app.use((err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Interal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    })
})