var userRoutes = require('express').Router();
var logger = require('../../util/logger');
var userController = require('./user.controller');
var authService = require('../../auth/authenticate.service');

//the user gets the token when they sign up or log in. The token must be kept for subsequent login
var checkUser = [authService.decodeToken(), authService.getFreshUser()];

userRoutes.param('id', userController.params);
userRoutes.get('/me', checkUser, userController.me);
userRoutes.get('/count', userController.count);

//post is for signUp so no authentication checks
userRoutes.route('/')
	.get(checkUser, userController.get)
	.post(userController.post);

userRoutes.route('/:id')
		.get(userController.getOne)
		//.put(checkUser, userController.put)
		.put(userController.put)
		.delete(userController.delete);





module.exports = userRoutes;
