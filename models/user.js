var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new Schema({
  username: {type: String , required: true, unique: true},
  password: {type: String , required: true},
  failed: Number,
  banned: Boolean,
  blocked: Boolean,
  level: {type: String , required: true}
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
