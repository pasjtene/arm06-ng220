var router = require('express').Router();

//The api router mounts ather router.
var userRoutes = require('./user/user.routes');
var postRoutes = require('./post/post.routes');
var locationRoutes = require('./location/location.routes');
var assetRoutes = require('./asset/asset.routes');
var organizationroutes = require('./organization/organization.routes');
var logger = require('../util/logger');

logger.log("Loading API Routes ");

router.use('/users', userRoutes);
router.use('/categories', require('./category/category.routes'));
router.use('/posts', postRoutes);
router.use('/locations', locationRoutes);
router.use('/assets', assetRoutes);
router.use('/organizations', organizationroutes);
router.use('/userj', assetRoutes);

logger.log("API Routes loaded Exporting... ");

module.exports = router;
