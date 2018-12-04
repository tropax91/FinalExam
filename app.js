const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require ('./config/database');
//const path= require('path');
const exphns = require('express-handlebars')

//Init app
const app = express();

//view engine setup
app.set('../public',__dirname);
app.engine('handlebars', exphns());
app.set('view engine', 'handlebars');

// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



 

//var config = require('../BachelorProject/config/database.js')
var connection = mysql.createConnection(config.databaseConfig);


//Home route
app.get('/', function (req, res) {
    res.render("index");
})




let beboer = require('./routes/beboer.js');
app.use('/beboer', beboer);
let bestyrelse = require('./routes/Bestyrelse.js');
app.use('/bestyrelse', bestyrelse);
  
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})

