//require required modules
var mongoose = require('mongoose');
var employee = mongoose.model('employee');
var employeesDAO = require('../service/employeesDAO');

//function that handles JSON responses
function sendJSONresponse(res, status, content) {
	res.status(status);
	res.json(content);
}

//exports function that reads all employees
module.exports.employeesReadAll = function(req, res) {
	employeesDAO.employeesReadAll().then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
};

//exports function that reads one employee
module.exports.employeesReadOne = function(req, res) {
	employeesDAO.employeesReadOne(req.params.employeeid).then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
};

//exports function that allows user to add employee
module.exports.employeesCreate = function(req, res) {
	employeesDAO.employeesCreate(req).then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
}

//exports function that allows user to update employee
module.exports.employeesUpdateOne = function(req, res) {
	employeesDAO.employeesUpdateOne(req).then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
}

//exports function that allows user to delete employee
module.exports.employeesDeleteOne = function(req, res) {
	employeesDAO.employeesDeleteOne(req.params.employeeid).then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
}