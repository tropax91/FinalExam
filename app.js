const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
//const passport = require('passport');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;


//Connect to mongo
let path = "mongodb://localhost:27017/laundryservice"
mongo.connect('mongodb://localhost:27017/laundryservice')

mongoose.connect(path, function (err, db) {
    if (err) {
        console.log("Error running mongodb", err);
        return;
    }
    console.log("Connected to MongoDB!");
});


//Passport config
//require('./config/passport')(passport);

//Passportmiddleware
//app.use(passport.initialize());
//app.use(passport.session());


app.use(express.static(__dirname + "/public"))// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


let beboer = require('./routes/beboer.js');
app.use('/beboer',beboer);

//View Engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'asecret',
    resave: true,
    saveUninitialized: true,
  }));


//app.use(flash());

/*app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
})*/


app.get('/', function (req, res) {
    res.render('index2');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/register', function (req, res) {
    res.render('register');
});


//Registration
app.post('/register', function(req, res) {

    let data = req.body; //bodyParser at work, makes this work
    let pwd = data.password;
   
    mongo.connect(path, function(err, db) {
        if(err) {
            console.log("Error connecting to mongodb: ", + err);
            
        }

        let collection = db.collection('occupant'); //insertion, table name
        

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) throw err;
            bcrypt.hash(pwd, salt, function(err, hash){
                if(err) throw err;

                pwd = hash;

                collection.insert(
                    {firstname: req.body.firstname,
                     lastname: req.body.lastname,
                     Email: req.body.Email,
                     password: pwd,
                     buildingID: req.body.buildingID}, function(err, success) {
                    console.log(success);
                    console.log('Hashed password: ' + pwd);
                    
                    db.close();
                    
                });  
            });
                
        });      
      
    });
    
});






app.listen('3000', function (err) {
    if (err) {
        console.log("Couldn't connect to the server");

    }
    console.log("Server is running on port 3000...");

})