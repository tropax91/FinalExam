var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var app = express()
//var app = Handlebars();
app.set('view engine', 'express')
var config = require('../BachelorProject/config/database.js')
var connection = mysql.createConnection(config.databaseConfig);

app.use(express.static(__dirname + "views"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Home route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

let beboer = require('./routes/beboer.js');
app.use('/beboer', beboer);
//let bestyrelse = require('./routes/Bestyrelse.js');
//app.use('/bestyrelse', bestyrelse);
  
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})

