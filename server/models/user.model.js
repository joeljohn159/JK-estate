const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
        trim: false,
        minLength : 3
    },
    email:{
        type : String,
        required: true,
        unique: true,
        trim: false,
        minLength : 3
    },
    password:{
        type : String,
        required: true,
        unique: true,
        trim: false,
        minLength : 3
    },
    photoURL: {
        type: String,
        default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
},
{ timestamps : true}
)

const User = mongoose.model('User', userSchema)

// export default User;
module.exports = User;