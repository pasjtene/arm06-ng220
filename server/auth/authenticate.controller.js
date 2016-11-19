var User = require('../api/user/user.model');
var signToken = require('./authenticate.service').signToken;
var logger = require('../util/logger');

exports.login = function(req, res, next) {
	logger.log("Attempting authentication...");
  logger.log("Request body: "+JSON.stringify(req.body));
	var token = signToken(req.user._id);
	res.json({token: token});
};
