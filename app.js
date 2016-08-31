var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var port = 8080

var mongoose = require('mongoose');
var mongo_address = "127.0.0.1";
mongoose.connect(mongo_address);

// Configure middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: '0pyb51X0BCsT9bms7f2f'
}));

var user = require('./routes/user');
app.use('/api/user/', user);

var log = require('./routes/log');
app.use('/api/log', log);

var report = require('./routes/report');
app.use('/api/report', report);

app.listen(port);
console.log('API running on port ' + port);
