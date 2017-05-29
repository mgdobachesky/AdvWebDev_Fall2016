//create sub-module named employee
(function() {
	'use strict';
	angular.module('app.employee', []);
	
	//push the sub-module to the main-module
	angular.module('app').requires.push('app.employee');
})();