//- Author: Harshkumar patel-200394746 Nihar patel-200396470 Yash Nakrani-200395656 arpit patel-200393479
//- website: https://survey-site-online.herokuapp.com/
//- Description: this is file of index file to route the user to login and register



'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

/* GET Login page. */
router.get('/login', function (req, res) {
    res.render('login', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function (req, res) {
    res.render('register', { title: 'Express' });
});

/* GET header page. */



module.exports = router;
