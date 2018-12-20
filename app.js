const express = require('express');
const exphns = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

mongoose.connect(config.database);
let db = mongoose.connection;

//Check connection
db.once('open', function(){
    console.log('Connected to MongoDB!')
})

//Check for DB errors
db.on('error', function(err){
    console.log(err);
});

//Init app
const app = express();

//Bring in models
let News = require('./models/news')

//Load view engine
app.set('views',path.join(__dirname, 'views'));
app.engine('handlebars', exphns());
app.set('view engine','handlebars');

// Body parse Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages= require('express-messages')(req, res);
    next();
});

// Exoress validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// Passport Config
require('./config/passportBestyrelse')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.bestyrelse = req.bestyrelse || null;
    next();
});

//Home Route
app.get('/', function(req, res){
    News.find({}, function(err, news) {
        if(err){
            console.log(err);
        } else {
            res.render('index2', {
                title:'News',
                news: news
            }); 
        }
    });
});

// Route Files
let news = require('./routes/news');
let users = require('./routes/users');
let bestyrelse = require('./routes/bestyrelse');
let nodemailer = require('./routes/nodemailer');
let reservation = require('./routes/reservation');
app.use('/reservation', reservation);
app.use('/news', news);
app.use('/users', users);
app.use('/bestyrelse', bestyrelse);
app.use('/nodemailer', nodemailer);


//Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...')
});
