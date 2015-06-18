/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var mongoose = require('mongoose');
    var router = express.Router();
    var Trigger = mongoose.model('Trigger');

    /* GET triggers listing. */
    router.get('/latest', function(req, res, next) {
        Trigger.find().sort([
            ['date', 'descending']
        ]).limit(1).exec(function(err, trigger) {
            if(err){
                return next(err);
            }

            res.json(trigger[0]);
        });
    });
    module.exports = router;

    return router;
})();
