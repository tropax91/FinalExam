let mongoose = require('mongoose');


//Reservation Schema
const reseveringSchema = mongoose.Schema({
    userid:{
        type: String,
        //required: true,
    }, 
    datestart:{
        type: String,
        required: true,
    },
    dateend:{
        type: String,
        required: true,
    }
});

const Reservering = module.exports = mongoose.model('Reservering', reseveringSchema);