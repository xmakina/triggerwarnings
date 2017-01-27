/*jslint node: true */
(function() {
    'use strict';

    var mongoose = require('mongoose');

    var TriggerSchema = new mongoose.Schema({
  		show: Number,
  		showName: String,
  		episode: Number,
  		episodeName: String,
        start: Number,
        duration: Number,
        tags: [String],
        date: { type: Date, default: Date.now },
        authour: String,
        flagged: Boolean
    });

    mongoose.model('Trigger', TriggerSchema);
}());
