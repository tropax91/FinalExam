let mongoose = require ('mongoose');

//News Schema
let newsSchema = mongoose.Schema( {
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    }
});

let News = module.exports = mongoose.model('News', newsSchema);