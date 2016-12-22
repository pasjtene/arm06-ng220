/*
* Author: Pascal Tene
* Created: 20 Dec 2016
*/

var organizationRoutes = require('express').Router();
var controller = require('./organization.controller');

organizationRoutes.route("/")
        .post(controller.post)
        .get(controller.get);


module.exports = organizationRoutes;
