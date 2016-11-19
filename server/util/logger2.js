var winston = require('winston');
var config = require('../config/config');

var customColors = {
  error: 'red',
  debug: 'red',
  info: 'green',
  warn: 'yellow',
  crit: 'red',
  fatal: 'red'
};

var logger2 = new (winston.Logger)({
  colors: customColors,
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true
    }),
    new (winston.transports.File)({ filename: 'arm.log' })
  ]
});

if(config.consoleLog) {
  logger2.info("We are in dev mode. Console logging enable");
} else {
  logger2.remove(winston.transports.Console);
  logger2.info ("Only logging in file Production mode");  
}

 logger2.level = 'debug';
 logger2.log('debug', 'Now my debug messages are written to console!');

module.exports = logger2;
