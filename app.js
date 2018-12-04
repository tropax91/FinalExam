<<<<<<< HEAD
const express = require('express')
=======
const express = require('express');
const exphns = require('express-handlebars');
const path= require('path');
>>>>>>> 1ca93e5a95767d2e4078196b159613c148675c95
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const mysql = require('mysql');
const config = require ('./config/database');
<<<<<<< HEAD
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
=======
const passport = require('passport');

>>>>>>> 1ca93e5a95767d2e4078196b159613c148675c95

//Check for DB errors

<<<<<<< HEAD

 

//var config = require('../BachelorProject/config/database.js')
var connection = mysql.createConnection(config.databaseConfig);
=======

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
>>>>>>> 1ca93e5a95767d2e4078196b159613c148675c95

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages= require('express-messages')(req, res);
    next();
});

<<<<<<< HEAD
//Home route
app.get('/', function (req, res) {
    res.render("index");
})
=======
//Home Route
app.get("/", function(req,res) {
    res.render("index");
});
>>>>>>> 1ca93e5a95767d2e4078196b159613c148675c95

// Route Files
let nodemailer = require('./routes/nodemailer');
let beboer = require('./routes/beboer')
let bestyrelse = require('./routes/bestyrelse')
app.use('/nodemailer',nodemailer);
app.use('/beboer', beboer);
app.use('/bestyrelse', bestyrelse);



<<<<<<< HEAD
let beboer = require('./routes/beboer.js');
app.use('/beboer', beboer);
let bestyrelse = require('./routes/Bestyrelse.js');
app.use('/bestyrelse', bestyrelse);
  
=======
//Start server
>>>>>>> 1ca93e5a95767d2e4078196b159613c148675c95
app.listen('3000', function(err){
    if(err){
        console.log("Couldn't connect to the server");
        
    }
    console.log("Server is running on port 3000...");
    
})

