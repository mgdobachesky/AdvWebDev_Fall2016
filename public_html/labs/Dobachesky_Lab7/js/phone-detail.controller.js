(function() {
	'use strict';
	
	//set up PhoneDetailController on the app module
	angular.module('app').controller('PhoneDetailController', PhoneDetailController);
	
	//set up angulars $routeParams and custom PhonesService to be preserved through minification
	PhoneDetailController.$inject = ['$routeParams', 'PhonesService'];
	
	//define the controller with the route params from angular and custom PhonesService
	function PhoneDetailController($routeParams, PhonesService) {
		//set the view model to this controller
		var vm = this;
		
		//set attributes
		vm.phone = {};
		var id = $routeParams.phoneId;
		
		//run activate function
		activate();
		
		//define activate function
		function activate() {
			//find the selected phone with the PhonesService method
			PhonesService.findPhone(id).then(function(response) {
				vm.phone = response;
			});
		};
	}
})();