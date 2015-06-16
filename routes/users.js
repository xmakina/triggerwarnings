/*jslint node: true */
(function() {
    'use strict';
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
                    id: users[i]._id,
                    name: users[i].username
                });
            }

            res.json(userList);
        });
    });

    module.exports = router;

    return router;
})();
