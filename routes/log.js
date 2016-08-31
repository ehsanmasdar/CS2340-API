var express = require('express');
var router = express.Router();
var Log = require('../models/log');
var access = require('../access');

router.get('/', access.requireAdmin, function(req, res) {
  Log.find(function(err,logs){
    res.json(logs);
  })
});

module.exports = router;
