/*
*Author Pascal Tene.
*Created: Sep 2016
*last Updated: Nov 21, 2016.
This is the main authentication service file where all business logique for authentication  are performed
*/
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('../api/user/user.model');
var logger = require('../util/logger');

exports.decodeToken = function() {

	return function(req, res, next) {
    //for remote authentication to the API via query string
		if (req.query && req.query.hasOwnProperty('arm_auth_token')){
			req.headers.authorization = 'Bearer ' + req.query.arm_auth_token;
		} else {
      //for local auth, the auth token is added to headers
      logger.log("No Query String let's check headers");
      if(req.headers.hasOwnProperty('arm_auth_token')){
        req.headers.authorization = 'Bearer ' + req.headers.arm_auth_token;
      }
    }

		//This expressJwt function will verify the token and set the req.user._id to the id found in the token.
		//Any further action to the req.user._id is on the user found in the token.. the authenticated user.
		checkToken(req, res, next);
	};
};

exports.getFreshUser = function() {
	return function(req, res, next) {
		User.findById(req.user._id)
			.then(function(user) {
				if(!user) {
					//res.status(401).send('Unauthorized');
					res.json("false");
				} else {
					req.user = user;
					next();
				}
			}, function(err){
				next(err);
			});
	};
};

exports.verifyUser = function() {
    return function(req, res, next) {
        var username = req.body.userName;
        var password = req.body.password;

        if (!username || !password) {
            logger.log(__filename + ' Authentication attempt failed username and password not provided');
            res.status(400).send('Wrong username and password...');
            return;
        }

        //The username and password are provided
        User.findOne({
                username: username
            })
            .then(function(user) {
                if (!user) {
                    logger.log(__filename + ' user does not exist ' + username);
                    res.status(401).send('Wrong username and password');
                } else {
                    if (!user.authenticate(password)) {
                        logger.log(__filename + ' failled authentication for user ' + username);
                        res.status(401).send('Wrong username and password');
                    } else {
                        logger.log(__filename + ' Authentication success for ' + username);
                        req.user = user;
                        next();
                    }
                }
            }, function(err) {
                logger.log(__filename + ' Error trying to find the user ' + username);
                next(err);
            });
    };
};


//Veryfy authentication token for a user already loggedIn
exports.verifyPersistentUser = function() {
    return function(req, res, next) {
      logger.log(__filename + ' Verifying user: ' +JSON.stringify(req.body));
        var username = req.body.headers.userName; //The userName as send by Observable is well formated
        var arm_auth_token = req.body.headers.arm_auth_token;
				  logger.log(__filename + ' Trying to auth .... ' + username);					
					logger.log(__filename + ' Verifying user:.. Headers ' +req.body.headers.userName);
        if (!username || !arm_auth_token) {
            logger.log(__filename + ' No user authenticated');
            //send false string
            res.send({token: "false"});
            return;
        }

        //The username is available from headers
        User.findOne({
                username: username
            })
            .then(function(user) {
                if (!user) {
                    logger.log(__filename + ' user does not exist ' + username);
                    res.status(401).send('Wrong username and password');
                } else {
                        logger.log(__filename + ' Authentication success for ' + username);
                        req.user = user;
                        next();
                }
            }, function(err) {
                logger.log(__filename + ' Error trying to find the user ' + username);
                next(err);
            });
    };
};


exports.signToken = function(id) {
    return jwt.sign({
            _id: id
        },
        config.secrets.jwt, {
            expiresIn: config.expireTime
        }
    );
};
