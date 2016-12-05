
require('colors');
var _ = require('lodash');

var config = require('../config/config');

//We are currently using loger2 to log to a file
//if logging is enable, we use console.log
//otherwise we use nolog to do nothing
var nolog = function(){};
var consoleLog = config.logging ? console.log.bind(console) : nolog;

var logger = {
		log: function() {
			var tag = '[ * LOGGER * ]'.green;
			var args = _.toArray(arguments)
				.map(function(arg) {
					if(typeof arg === 'object') {
						//transform the object to string
						var string = JSON.stringify(arg, 2);
						return tag + ' ' + string.cyan;
					}else{
						//coerse to string
						arg += '';
						return tag + ' ' +arg.cyan;
					}
				});
			consoleLog.apply(console, args);
		},

error: function() {
	var args = _.toArray(arguments)
		.map(function(arg){
			arg = arg.stack || arg;
			var name = arg.name || '[ * ERROR * ]';
			var log = name.yello + ' ' + arg.red;
			return log;
		});

}
};
logger.log("In logger ");
module.exports = logger;
