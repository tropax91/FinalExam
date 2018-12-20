const mongoose = require('mongoose');

//Bestyrelse Schema
const BestyrelseSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
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
    }
});

const Bestyrelse = module.exports = mongoose.model('Bestyrelse', BestyrelseSchema);