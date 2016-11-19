var logger = require('../util/logger');

module.exports = function() {
	return function(err, req, res, next) {
		console.log(err.message);
		if(err.name === 'UnauthorizedError'){
			res.status(401).send('Invalid token');
			return;
		}
		logger.error(err.stack);
		res.status(500).send('An Error has occured');
	};
};
