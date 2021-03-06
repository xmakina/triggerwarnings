/*jslint node: true */
(function() {
    'use strict';

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');
    var passport = require('passport');

    mongoose.connect(process.env.MONGOLAB_URI);

    require('./models/Users');
    require('./models/Triggers');
    require('./config/passport');

    var routes = require('./routes/index');
    var auth = require('./routes/auth');
    var users = require('./routes/users');
    var tvdb = require('./routes/tvdb');
    var episodes = require('./routes/episodes');
    var triggers = require('./routes/triggers');

    var app = express();
    app.use(passport.initialize());
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);
    app.use('/', auth);
    app.use('/api/v1/users', users);
    app.use('/api/v1/tvdb', tvdb);
    app.use('/api/v1/episodes', episodes);
    app.use('/api/v1/triggers', triggers);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(favicon(__dirname + '/public/favicon.ico'));

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    module.exports = app;

    return app;
})();
