var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SourceSchema = new Schema({
  date: { type: Date, default: Date.now },
  name: String,
  lat: Number,
  long: Number,
  type: String,
  condition: String,
});

module.exports = mongoose.model('Source', SourceSchema);
