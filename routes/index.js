var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.authCode) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    var user = new User();

    if (req.body.authCode !== process.env.AUTHCODE) {
        return res.status(400).json({
            message: 'Incorrect code'
        });
    }

    user.username = req.body.username;
    user.score = req.body.score;

    user.save(function(err) {
        if (err) {
            return next(err);
        }

        res.json(true);
    });
});

module.exports = router;
