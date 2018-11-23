const express = require('express');
const exphns = require('express-handlebars');
const path= require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require ('./config/database');
const passport = require('passport');


//Check for DB errors


//Init app
const app = express()

//view engine setup
app.set('views',path.join(__dirname, 'views'));
app.engine('handlebars',exphns());
app.set('view engine','handlebars');

//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Home Route
app.get("/", function(req,res) {
    res.render("index");
});

// Route Files


//Start server
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})