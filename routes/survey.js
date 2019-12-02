//- Author: Harshkumar patel-200394746 Nihar patel-200396470 Yash Nakrani-200395656 arpit patel-200393479
//- website: https://survey-site-online.herokuapp.com/
//- Description: This file is used for the basis survey states foe adding and editing the surveys 



'use strict';
var express = require('express');
var router = express.Router();
var Survey = require('../model/survey');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});


//Get all survey
router.get('/survey', function (req, res) {
    Survey.find(function (err, survey) {
        if (err) console.log(err);
        else res.render('survey', { allSurvey: survey });
    });
});

router.get('/surveys', function (req, res) {
    Survey.find(function (err, survey) {
        if (err) console.log(err);
        else res.render('surveys', { allSurvey: survey });
    });
});

//Add Ad Page
router.get('/survey/add', isLoggedIn, function (req, res) {
    var id = req.params.id;
    res.render('add');
});

//Add Ad to DB
router.post('/survey/add',isLoggedIn, function (req, res) {
    var id = req.params.id;
    Survey.create({
        title: req.body.title,
        description: req.body.description,
    }, function (err, Survey) {
        if (err) console.log(err);
        else {
            console.log('Ad added : ' + Survey);
            res.render('added', { survey: Survey.title });
        }
    });
});

//Delete A survey
router.get('/survey/delete/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;
    Survey.deleteOne({ _id: id }, function (err) {
        console.log(id);
        if (err)
            console.log('survey : ' + id + 'not found!');
        else
            res.redirect('/survey');
    });
});




//Edit A survey Page
router.get('/survey/edit/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;

    Survey.findById(id, function (err, product) {
        if (err)
            res.send('survey : ' + id + 'not found!');
        else
            res.render('editsurvey', { survey: product });
    });
});

//Edit a survey and save to DB
router.post('/survey/edit', isLoggedIn, function (req, res) {
    var id = req.body.id;
    var editedSurvey = {
        _id: id,
        title: req.body.title,
        description: req.body.description
    };
    Survey.updateOne({ _id: id }, editedSurvey, function (err) {
        if (err) res.send('survey: ' + id + ' not found!');
        else {
            console.log('survey' + id + ' updated!');
            res.redirect('/survey');
        }
    });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/login');
}



module.exports = router;
