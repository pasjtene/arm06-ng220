var locationRoutes = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./location.controller');

locationRoutes.param('id', controller.params);

locationRoutes.route('/')
  .get(controller.get)
  .post(controller.post)
  .put(controller.put);

locationRoutes.route('/:id')
    .delete(controller.delete);



module.exports = locationRoutes;
