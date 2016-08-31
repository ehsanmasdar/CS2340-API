function requireUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
		res.json({success: 0, message: "Access Denied based on user level"});
  }
}
function requireWorker(req, res, next) {
  if (req.session.user && (req.session.user.level == "worker" || req.session.user.level == "manager" || req.session.user.level == "admin") ) {
    next();
  } else {
		res.json({success: 0, message: "Access Denied based on user level"});
  }
}
function requireManager(req, res, next) {
  if (req.session.user && (req.session.user.level == "manager" || req.session.user.level == "admin")) {
    next();
  } else {
		res.json({success: 0, message: "Access Denied based on user level"});
  }
}
function requireAdmin(req, res, next) {
  if (req.session.user && req.session.user.level == "admin") {
    next();
  } else {
		res.json({success: 0, message: "Access Denied based on user level"});
  }
}
module.exports = {requireAdmin,requireManager,requireWorker,requireUser};
