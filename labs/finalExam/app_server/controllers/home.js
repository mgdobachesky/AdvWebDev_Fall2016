var request = require('request');

module.exports.home = function(req, res) {
	var options = {
			'url' : 'http://localhost:3000/api/v1/products',
			'method' : 'GET',
			'json' : {},
			'qs' : {}
	};
	request(options, function(err, response, body) {
		var results = [];
		if(response.statusCode === 200 && body.length) {
			results = (body instanceof Array) ? body : [];
		}
		
		res.render('home', {
			'title' : 'Products',
			'results' : results
		});
	});
};

module.exports.formView = function(req, res) {
	res.render('form', {
		'title' : 'Add Product',
		'message' : ''
	});
};

module.exports.formPost = function(req, res) {
	if(req.method === 'POST') {
		var options = {
			'url' : 'http://localhost:3000/api/v1/products',
			'method' : 'POST',
			'json' : {
				'product' : req.body.product,
				'description' : req.body.description,
				'price' : req.body.price
			},
			'qs' : {}
		};
		
		request(options, function(err, response, body) {
			res.render('form', {
				'title' : 'Add Product',
				'message' : 'Successfully added product!'
 			});
		});
	}
};