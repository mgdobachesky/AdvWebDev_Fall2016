var mongoose = require('mongoose');
var product = mongoose.model('Product');
var productDAO = require('../service/productDAO');

function sendJSONresponse(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.productReadAll = function(req, res) {
	productDAO.productReadAll().then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
};

module.exports.productCreate = function(req, res) {
	productDAO.productCreate(req).then(function(results) {
		sendJSONresponse(res, 200, results);
	}, function(err) {
		sendJSONresponse(res, 404, err);
	});
};