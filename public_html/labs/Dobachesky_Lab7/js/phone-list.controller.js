(function() {
	'use strict';
	
	//set up angular controller and the module to use
	angular.module('app').controller('PhoneListController', PhoneListController);
	
	//for injecting into the PhoneListController
	PhoneListController.$inject = ['PhonesService'];
	
	//function that defines the PhoneListController
	function PhoneListController(PhonesService) {
		//set the view model equal to this controller
		var vm = this;
		
		//create attributes
		vm.phones = [];
		
		//run activate function
		activate();
		
		//define activate function
		function activate() {
			//run the getPhones method of the PhoneService 
			//then make the view model phones attribute equal to the response
			PhonesService.getPhones().then(function(response) {
				vm.phones = response;
			});
		}
	}
})();