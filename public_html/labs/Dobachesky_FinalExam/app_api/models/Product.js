var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	'product' : {
		'type' : String,
		'required' : true
	},
	'description' : {
		'type' : String,
		'required' : false
	},
	'price' : {
		'type' : Number,
		'required' : true
	}
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;