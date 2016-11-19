module.exports = {
		logging: true,
		consoleLog: true,
		seed: true,
		db: {
			url: process.env.MONGOLAB_URI || 'mongodb://localhost/dev_arm_db' //process.env.MONGOLAB_URI is for deployment on Heroku. should be checked for different environment
		}
};
