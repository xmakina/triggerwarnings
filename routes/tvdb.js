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
           
res.json([{'id':123, 'name':'orange is the new black'}
    ,{'id':13, 'name':'game of thrones'}]);
return;

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
