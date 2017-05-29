//require required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');

//require the routes this app is going to use
var routesApp = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

//create an express object named app
var app = express();

//set up the apps default view location
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

//place favicon in "/public" then uncomment following line
//app.use(favicon(__dirname + '/public/favicon.ico'));

//set app to use required modules
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use to display json is a more readable format
app.set('json spaces', 2);

//enable cross origin resource sharing (CORS)
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	next();
});

//set up routes that this app is going to use
app.use('/', routesApp);
app.use('/api/v1', routesApi);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//**error handlers**

//development error handler, prints stack trace
if(app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

//production error handler, no stack trace for security
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

//export app to be used by server
module.exports = app;
