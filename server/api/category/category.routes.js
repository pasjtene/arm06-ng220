var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./category.controller');
var authService = require('../../auth/authenticate.service');

//Decode token and getFreshUser will run each time checkUser is invoked
var checkUser = [authService.decodeToken(), authService.getFreshUser()];

router.route('/')
	.get(controller.get)
	.post(checkUser, controller.post);

router.route('/:id')
	  .get(controller.getOne)
	  .put(checkUser, controller.put)
	  .delete(checkUser, controller.delete);

module.exports = router;
