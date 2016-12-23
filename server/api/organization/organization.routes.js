/*
* Author: Pascal Tene
* Created: 20 Dec 2016
*/

var organizationRoutes = require('express').Router();
var controller = require('./organization.controller');

organizationRoutes.param('id', controller.params);
organizationRoutes.route("/")
        .post(controller.post)
        .get(controller.get);

organizationRoutes.route("/:id")
        .delete(controller.delete);


module.exports = organizationRoutes;
