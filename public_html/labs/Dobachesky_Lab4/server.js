#!/usr/bin/env node
//require required modules
var debug = require('debug')('Express4');
var app = require('./app');

//set the app to run on port 3000
app.set('port', process.env.PORT || 3000);

//start the server listening on the port that the app is running on
var server = app.listen(app.get('port'), function() {
	debug('Express server listening on port ' + server.address().port);
});