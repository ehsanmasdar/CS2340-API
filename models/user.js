var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
  username: String,
	password: String,
  failed: Number,
  banned: Boolean,
  blocked: Boolean,
  level: String
});

module.exports = mongoose.model('User', UserSchema);
