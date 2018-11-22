var express = require('express')
var mysql = require('mysql')

var app = express()
var app = Handlebars();


var config = require('../BachelorProject/config/database.js')
var connection = mysql.createConnection(config.databaseConfig);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

  
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})

let beboer = require('./routes/beboer.js');
app.use('/beboer', beboer);
let bestyrelse = require('./routes/Bestyrelse.js');
app.use('/bestyrelse', bestyrelse);