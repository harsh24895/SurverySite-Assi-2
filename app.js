'use strict';
//var debug = require('debug');
var express = require('express');
var path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //express-session package for session 
var mongoose = require('mongoose'); //Require for mongo db connection
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./model/user');

//Use mongodb connection string
mongoose.connect(
     'mongodb+srv://yash:yash12345@cluster0-m6d14.azure.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//Successfully connected message

var db = mongoose.connection;
db.on('error', () => console.log('There was an error connecting'));
db.once('open', () => console.log('We have connected to Mongo Atlas'));




var routes = require('./routes/index');
var users = require('./routes/users');
var authRouter = require('./routes/auth');
var surRouter = require('./routes/survey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'unicorn',
        resave: false,
        saveUninitialized: true
    })
);



// Init Passport for Authentication, this must be done after we use our session
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.isAuthenticated();
    res.locals.user = req.user;

    if (req.isAuthenticated()) {
        res.locals.role = req.user.role;
    } else {
        res.locals.role = null;
    }

    next();
});

app.use('/', authRouter);
app.use('/', surRouter);
app.use('/', routes);
app.use('/users', require('./routes/users'));
app.use('/users', require('./routes/survey'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



