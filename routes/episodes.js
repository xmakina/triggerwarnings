/*jslint node: true */
(function() {
    'use strict';
    var express = require('express');
    var mongoose = require('mongoose');
    var router = express.Router();
    var Trigger = mongoose.model('Trigger');

    var jwt = require('express-jwt');
    var auth = jwt({secret: process.env.SECRET, userProperty: 'payload'});

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

    router.post('/:id/triggers', auth, function(req, res, next) {
        if (!req.body.start || !req.body.duration || !req.body.tags) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }

        if (!req.body.show || !req.body.showName || !req.body.episodeName) {
            return res.status(400).json({
                message: 'There has been a system error. Please report this.'
            });
        }

        var trigger = new Trigger();
        trigger.show = req.body.show;
        trigger.showName = req.body.showName;
        trigger.episode = req.params.id;
        trigger.episodeName = req.body.episodeName;
        trigger.start = req.body.start;
        trigger.duration = req.body.duration;
        trigger.tags = req.body.tags;
        trigger.authour = req.payload.username;

        trigger.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.json(trigger);
        });
    });

    router.put('/:episodeId/triggers/:id', function(req, res, next) {
        if (!req.body.start || !req.body.duration || !req.body.tags) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        }

        Trigger.findOne({
            _id: req.params.id
        }, function(err, trigger) {
            if (err) {
                return next(err);
            }

            trigger.start = req.body.start;
            trigger.duration = req.body.duration;
            trigger.tags = req.body.tags;

            trigger.save(function(err) {
                if (err) {
                    return next(err);
                }

                return res.json(trigger);
            });
        });
    });

    router.delete('/:episodeId/triggers/:id', function(req, res, next) {
        Trigger.findOne({
            _id: req.params.id
        }, function(err, trigger) {
            if (err) {
                return next(err);
            }

            trigger.remove(function(err) {
                if (err) {
                    return next(err);
                }

                return res.json(trigger);
            });
        });
    });

    module.exports = router;

    return router;
})();
