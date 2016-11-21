/*
*Author Pascal Tene.
*Created: Sep 2016
*last Updated: Nov 21, 2016.
Database connection is managed in this file
*/

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../config/config');
var logger = require('./logger2');

logger.log("Connecting to database ");
//db is defined in ../config/development or ../config/production or ../config/testing.
//one of those file is merged with config.js
mongoose.connect(config.db.url);
logger.debug("Database connection successful: "+config.db.url);

module.exports = mongoose;
