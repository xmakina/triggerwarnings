var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        }

        var userList = [];

        for (var i = 0; i < users.length; i++) {
            userList.push({
                name: users[i].username,
                score: users[i].score
            });
        }

        res.json(userList);
    });
});

module.exports = router;
