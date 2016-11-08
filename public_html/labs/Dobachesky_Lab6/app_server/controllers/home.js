//require required modules
var request = require('request');

//module that will request data and display it on the homepage
module.exports.home = function(req, res) {
	var options = {
		'url' : 'http://localhost:3000/api/v1/employees',
		'method' : 'GET',
		'json' : {},
		'qs' : {}
	};
	request(options, function(err, response, body) {
		var results = [];
		if(response.statusCode === 200 && body.length) {
			results = (body instanceof Array) ? body : [];
		}
		
		res.render('index', {
			'title' : 'Home Page',
			'results' : results
		});
	});
};

//module that will render the form for adding an employee
module.exports.form = function(req, res) {
	res.render('form', {
		'title' : 'New Employee',
		'message' : ''
	});
};

//module that will post the data to mongodb
module.exports.createEmployee = function(req, res) {
	if(req.method === 'POST') {
		var options = {
			'url' : 'http://localhost:3000/api/v1/employees',
			'method' : 'POST',
			'json' : {
				'firstName': req.body.firstName,
				'lastName': req.body.lastName,
				'department': req.body.department,
				'startDate': req.body.startDate,
				'jobTitle': req.body.jobTitle,
				'salary': req.body.salary
			},
			'qs' : {}
		};
		request(options, function(err, response, body) {
			res.render('form', {
				'title' : 'New Employee',
				'message' : 'Successfully added employee!'
			});
		});
	}
};