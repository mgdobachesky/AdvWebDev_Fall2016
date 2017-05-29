var mongoose = require('mongoose');
var Product = mongoose.model('Product');

function productReadAll() {
	var promise = new Promise(function(resolve, reject) {
		Product.find().exec(function(err, results) {
			if(err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
	return promise;
}

function productCreate(req) {
	var promise = new Promise(function(resolve, reject) {
		Product.create({
			'product' : req.body.product,
			'description' : req.body.description,
			'price' : req.body.price
		}, function(err, dataSaved) {
			if(err) {
				reject(err);
			} else {
				resolve(dataSaved);
			}
		});
	});
	return promise;
}

module.exports.productReadAll = productReadAll;
module.exports.productCreate = productCreate;