var _ = require('lodash');

var config = {
		dev: 'development',
		test: 'testing',
		prod: 'production',
		port: process.env.PORT || 80,
		logLevel: 'debug',
		//2 days in minutes
		//expiretime: 24 * 60 * 2,
		expiretime: 5,
		secrets: {
			jwt: process.env.JWT || 'jt.pas' //process.env.JWT can be manually configured on the environment like Heroku
		}
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;

config.env = process.env.NODE_ENV;

var envConfig;
try {
	envConfig = require('./' + config.env); //should bi './development' in dev and './production' in production environment
	envConfig = envConfig || {};
} catch(e) {
	envConfig = {};
}

//merge the twos config files. envConfig wins. This should be provided by the target deployment
//environment like Heroku or AWS

console.log("Merging and Exporting config file ");
module.exports = _.merge(config, envConfig);
