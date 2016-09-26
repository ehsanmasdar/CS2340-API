var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// Models
var User = require('../models/user');
var Log = require('../models/log');
var allowedIncorrectAttempts = 3;
var access = require('../access');

router.get('/', function(req, res) {
	if (req.session.user){
		res.json({user: req.session.user, success: 1})
	}
	else {
		res.json({success: 0, message: "User not logged in"})
	}
});

router.route('/register').post(function(req, res) {
  if(req.body.username && req.body.password && req.body.level){
		var hash = bcrypt.hashSync(req.body.password, salt);

    var user = new User({
			username: req.body.username,
			password: hash,
			level: req.body.level
		});
    user.save(function(err){
      if (err){
				console.log(err);
        res.json({success:0});
      }
      else{
        res.json({success:1});
      }
    });
  }
  else{
    res.json({success:0});
  }
});

router.route('/login').post(function(req, res) {
  if(req.body.username && req.body.password){
		User.findOne({username:req.body.username}, function(err,user){
			if (user){
				if (user.blocked){
					res.json({success: 0, message: "Account locked, please contact an admin."});
				}
				else if(bcrypt.compareSync(req.body.password,user.password)){
					req.session.regenerate(function(){
			 			req.session.user = {username: user.username, _id: user._id, level: user.level};
						user.failed = 0;
						user.save(function (err){
							var log = new Log({type:"login-attempt", data: {userid:user.username,sucess:"success"}});
							log.save(function(err){
								res.json({success: 1, message: "Logged in!"});
							});
						});
		 			});
				}
				else{
					var log = new Log({type:"login-attempt", data: {userid:user.username,sucess:"bad password"}});
					user.failed += 1;
					if (user.failed >= allowedIncorrectAttempts ){
						user.blocked = true;
					}
					user.save(function (err){
						log.save(function(err){
							res.json({success:0, message: "Password incorrect"});
						});
					});

				}
			}
			else{
				var log = new Log({type:"login-attempt", data: {sucess:"unknown id"}});
				log.save(function(err){
					res.json({success:0, message: "Username not found"});
				});
			}
		});
  }
  else{
    res.json({success: 0, message: "Username or password not supplied"});
  }
});
router.route('/delete').post(access.requireAdmin, function(req, res) {
  if(req.body.username){
		User.findOne({username:req.body.username}, function(err,user){
			if (user){
				User.remove({username: req.body.username}, function(err){
					if (err){
						console.log(err);
					}
					else{
						var log = new Log({type:"account-delete", data: {admin: req.session.user.username, userid: req.body.username}});
						log.save(function(err){
							res.json({success: 1});
						});
					}
				});
			}
			else{
				res.json({success: 0, message: "Username not found"});
			}
		});
  }
  else{
    res.json({success:0});
  }
});

router.route('/ban').post(access.requireAdmin, function(req, res) {
  if(req.body.username){
		User.findOne({username:req.body.username}, function(err,user){
			if (user){
				user.banned = true;
				user.save(function(err){
					var log = new Log({type:"user-ban", data: {admin: req.session.user.username, userid: req.body.username}});
					log.save(function(err){
						res.json({success: 1});
					});
				});
			}
			else{
				res.json({success: 0, message: "Username not found"});
			}
		});
  }
  else{
    res.json({success:0});
  }
});

router.route('/unblock').post(access.requireAdmin, function(req, res) {
  if(req.body.username){
		User.findOne({username:req.body.username}, function(err,user){
			if (user){
				user.blocked = false;
				user.save(function(err){
					var log = new Log({type:"unblock-account", data: {admin: req.session.user.username, userid: req.body.username}});
					log.save(function(err){
						res.json({success: 1});
					});
				});
			}
			else{
				res.json({success: 0, message: "Username not found"});
			}
		});
  }
  else{
    res.json({success:0});
  }
});
module.exports = router;
