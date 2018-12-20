const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required:'full name can´t be empty',
    },
    email:{
        type: String,
        required:true,
    },
    username:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },    
});

const User = module.exports = mongoose.model('User', UserSchema);