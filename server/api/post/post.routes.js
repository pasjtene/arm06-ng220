var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./post.controller');
var authService = require('../../auth/authenticate.service');

var checkUser = [authService.decodeToken(), authService.getFreshUser()];

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;
