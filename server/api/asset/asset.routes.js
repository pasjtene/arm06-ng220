var assetRoutes = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./asset.controller');

assetRoutes.param('id', controller.params);
assetRoutes.get('/count', controller.count);


assetRoutes.route('/')
  .get(controller.get)
  .post(controller.post);

assetRoutes.route('/:id')
    .delete(controller.delete);



module.exports = assetRoutes;
