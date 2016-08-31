var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PuritySchema = new Schema({
  date: { type: Date, default: Date.now },
  name: String,
  lat: Number,
  long: Number,
  condition: String,
  type: String,
  virus: Number,
  contaminant: Number
});

module.exports = mongoose.model('Purity', PuritySchema);
