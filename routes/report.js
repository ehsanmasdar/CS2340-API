var express = require('express');
var router = express.Router();

var Log = require('../models/log');
var Source = require('../models/source');
var Purity = require('../models/purity');

var access = require('../access');

router.get('/source', access.requireUser, function(req, res){
  Source.find(function(err,reports){
    res.json(reports);
  })
})
router.post('/source', access.requireUser, function(req, res) {
  if(req.body.lat && req.body.long && req.body.type && req.body.condition){
    var source = new Source({name: req.session.user.username,lat:req.body.lat, long:req.body.long, type: req.body.type, condition: req.body.condition});
    source.save(function(err){
      if (err){
        res.json({success:0});
      }
      else{
        res.json({success:1});
      }
    });
  }
  else{
    res.json({success:0, message: "All required fields not speicfied"});
  }
});

router.get('/purity', access.requireManager, function(req, res){
  Purity.find(function(err,reports){
    res.json(reports);
  })
})
router.post('/purity', access.requireWorker, function(req, res) {
  if(req.body.lat && req.body.long && req.body.virus && req.body.condition && req.body.contaminant){
    var purity = new Purity({name: req.session.user.username,lat:req.body.lat, long:req.body.long, virus: req.body.virus, condition: req.body.condition, contaminant: req.body.contaminant});
    purity.save(function(err){
      if (err){
        res.json({success:0});
      }
      else{
        res.json({success:1});
      }
    });
  }
  else{
    res.json({success:0, message: "All required fields not speicfied"});
  }
});

module.exports = router;
