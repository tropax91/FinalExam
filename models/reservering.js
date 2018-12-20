let mongoose = require('mongoose');


//Reservation Schema
const reseveringSchema = mongoose.Schema({
    userid:{
        type: String,
        //required: true,
    }, 
    datestart:{
        type: Date,
        required: true,
    },
    dateend:{
        type: Date,
        required: true,
    }
});

const Reservering = module.exports = mongoose.model('Reservering', reseveringSchema);