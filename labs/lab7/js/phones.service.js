(function() {
	'use strict';
	
	//add PhonesService to the factory method of the app angular module
	angular.module('app').factory('PhonesService', PhonesService);
	
	//inject the parameters to be used in PhonesService to protect from minification
	PhonesService.$inject = ['$http', 'REQUEST'];
	
	//function that returns phones data
	function PhonesService($http, REQUEST) {
		//url contains a link to the data
		var url = REQUEST.Phones;
		//service is an object that holds methods to interact with the data
		var service = {
			'getPhones' : getPhones,
			'findPhone' : findPhone
		};
		//this function returns service
		return service;
		
		//function that uses $http to make a promist to the data url, then run another function based on the results
		function getPhones() {
			return $http.get(url).then(getPhonesComplete, getPhonesFailed);
			
			//if the response was completed send back the data
			function getPhonesComplete(response) {
				return response.data;
			}
			
			//if the response failed send back an empty array
			function getPhonesFailed(error) {
				return [];
			}
		}
		
		//function that finds a phone, and requires an id parameter
		function findPhone(id) {
			return getPhones().then(function(data) {
				//get the phones then run function that finds a phone
				return findPhoneComplete(data);
			});
			
			//function that finds a phone
			function findPhoneComplete(data) {
				//initialize an empty results object
				var results = {};
				
				//for each phone do this
				angular.forEach(data, function(value, key) {
					//if results object is empty do this
					if(!results.length) {
						//if the phone has an id, and that id is equal to the one being searched for do this
						if(value.hasOwnProperty('id') && value.id === id) {
							//copy the angular value of the phone into the results object
							results = angular.copy(value);
						}
					}
				}, results);
				
				//return the phone
				return results;
			}
		}
	}
})();