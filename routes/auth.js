const express = require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');


router.get('/login', (req, res, next) => {
    res.render('login', {});
});

router.post(
    '/login',
    passport.authenticate('local', {
        failure: 'There was an issue with your username or password',
        failureRedirect: '/login',
        successRedirect: '/survey'
    })
);


router.get('/register', (req, res, next) => {
    res.render('register', {});
});


router.post('/register', (req, res, next) => {

    User.register(
        new User({ username: req.body.username }),
        req.body.password, // Password for hasing
        function (err, account) {
            if (err) {
                // If there's an error, render the register page
                console.log(err);
                return res.render('register', { account: account });
            }

            // Login if successful
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        }
    );
});

// Route 5 - GET Logout ( logout from nav )
router.get('/logout', (req, res, next) => {
    // Destroy session
    req.session.destroy(() => {
        // When done, redirect back to home
        res.redirect('/');
    });
});



module.exports = router;