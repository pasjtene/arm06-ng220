var User = require('../api/user/user.model');
var signToken = require('./authenticate.service').signToken;
var logger = require('../util/logger');

exports.login = function(req, res, next) {
	logger.log("Attempting authentication for user...",req.body.userName);
	var token = signToken(req.user._id);

	User.findOne({username: req.user.username})
					.select("-password") //remove password from dataset
					.exec()
					.then((user) => {
							console.log("The user is...:", req.user);
							res.json({token: token, user: user });
					})
					.catch((err) => {console.log(err);});
};
