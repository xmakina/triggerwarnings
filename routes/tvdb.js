/*jslint node: true */
(function() {
    'use strict';

    var TVDB = require("tvdb");
    var tvdb = new TVDB({
        apiKey: process.env.TVDBAPI
    });
    var express = require('express');
    var router = express.Router();

    /* GET users listing. */
    router.get('/shows/', function(req, res, next) {
        if (req.query.name !== undefined) {
            tvdb.findTvShow(req.query.name, function(err, tvShows) {
                if (err) {
                    return next(err);
                }

                res.json(tvShows);
            });
        } else {
            res.json([]);
        }
    });

    router.get('/shows/:id', function(req, res, next) {
        tvdb.getInfo(req.params.id, function(err, tvShows) {
            if (err) {
                return next(err);
            }

            res.json(tvShows);
        });
    });

    router.get('/episodes/:id', function(req, res, next) {
        tvdb.getInfo(req.params.id, function(err, tvShows) {
            if (err) {
                return next(err);
            }

            res.json(tvShows);
        });
    });

    module.exports = router;

    return router;
})();
