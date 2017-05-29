(function() {
	'use strict';
	
	//use the angular app module to create a constant consisting of a json data file
	angular.module('app').constant('REQUEST', {
		'Phones' : './data/phones.json'
	});
})();