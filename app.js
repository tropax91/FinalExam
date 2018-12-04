const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


require('./config/passport')(passport);



app.use(express.static(__dirname + "/public"))// Middleware. Needed in order to serve CSS, JS and images from html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


let beboer = require('./routes/beboer');
app.use('/beboer',beboer);

//View Engine
app.set('view engine', 'ejs');

app.use(session({
    secret: 'asecret',
    resave: true,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req,res);
    next();
})


app.get('/', function (req, res) {
    res.render('index2');
});






app.listen('3000', function (err) {
    if (err) {
        console.log("Couldn't connect to the server");

    }
    console.log("Server is running on port 3000...");

})