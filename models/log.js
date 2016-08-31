var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LogSchema = new Schema({
  date: { type: Date, default: Date.now },
	type: String,
  data: {},
});

module.exports = mongoose.model('Log', LogSchema);
