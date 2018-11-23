const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(express.static(__dirname + "/public"))// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//const bcrypt = require ('bcrypt');


 

var config = require('../BachelorProject/config/database.js')
var connection = mysql.createConnection(config.databaseConfig);


//Home route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
})




//let beboer = require('./routes/beboer.js');
//app.use('/beboer', beboer);
//let bestyrelse = require('./routes/Bestyrelse.js');
//app.use('/bestyrelse', bestyrelse);
  
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})

