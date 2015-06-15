/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var mongoose = require('mongoose');
    var router = express.Router();
    var Trigger = mongoose.model('Trigger');

    /* GET triggers listing. */
    router.get('/:id/triggers', function(req, res, next) {
        Trigger.find({
            episode: req.params.id
        }, function(err, triggers) {
            if (err) {
                return next(err);
            }

            var triggerList = [];

            for (var i = 0; i < triggers.length; i++) {
                triggerList.push({
                    id: triggers[i]._id,
                    episode: req.params.id,
                    start: triggers[i].start,
                    duration: triggers[i].duration,
                    tags: triggers[i].tags
                });
            }

            res.json(triggerList);
        });
    });

    router.post('/:id/triggers', function(req, res, next) {
        if (!req.body.start || !req.body.duration || !req.body.tags) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }

        var trigger = new Trigger();
        trigger.episode = req.params.id;
        trigger.start = req.body.start;
        trigger.start = req.body.duration;
        trigger.start = req.body.tags;

        trigger.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.json(trigger);
        });
    });

    module.exports = router;

    return router;
})();
