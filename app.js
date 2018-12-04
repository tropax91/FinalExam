const express = require('express');
const exphns = require('express-handlebars');
const path= require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
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

// Set Public Folder
app.use('/public', express.static(path.join(__dirname, 'public')));


//Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages= require('express-messages')(req, res);
    next();
});

//Home Route
app.get("/", function(req,res) {
    res.render("index");
});

// Route Files
let nodemailer = require('./routes/nodemailer');
let beboer = require('./routes/beboer')
let bestyrelse = require('./routes/bestyrelse')
app.use('/nodemailer',nodemailer);
app.use('/beboer', beboer);
app.use('/bestyrelse', bestyrelse);



//Start server
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})