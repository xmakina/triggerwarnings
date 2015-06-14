var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		unique: true
	},
  score: Number
});

mongoose.model('User', UserSchema);