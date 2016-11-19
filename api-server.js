/*
*Author Pascal Tene.
*Created: Sep 2016
*last Updated: 02 Nov 2016.
This is the main file that is run for the application to start.
*/
var express = require('express');
var path = require('path');
var api = require('./server/api/api');
var auth = require('./server/auth/authenticate.routes');
var config = require('./server/config/config');
var logger = require('./server/util/logger2');
var mLogger = require('morgan');
//+ add modules for body parse and session store
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


var app = express();
app.engine('.html', require('ejs').__express);
//app.set('views', __dirname + './views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'client')));
//+ add session store

//morgan logs requests on CLI for debugging
app.use(mLogger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser('SECRET'));

app.disable('etag');

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/api/', api);
app.use('/auth/', auth);

//This is important URL rewriting for express.
//The server returns the NG index.html file for all page not found. For link that exist in NG routes.

app.get('*', function(request, response, next) {
    response.sendfile(__dirname + '/client/index.html');
});

app.listen(config.port);
logger.info("Listenning on port " + config.port);
