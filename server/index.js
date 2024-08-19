
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MONGO Connected")
}).catch(err=>{
    console.log("ERROR ",err)
})



const app = express();

app.listen(3000, ()=>{
    console.log("SERVER running in Port : 3000")
})