/*jslint node: true */
(function() {
    'use strict';

    var mongoose = require('mongoose');

    var TriggerSchema = new mongoose.Schema({
  		episode: Number,
        start: Number,
        duration: Number,
        tags: [String]
    });

    mongoose.model('Trigger', TriggerSchema);
}());
