(function () {
	'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService);

	MenuDataService.inject = ['$q', '$http'];
	function MenuDataService ($q, $http) {
		var service = this;
		service.endpoint = "https://davids-restaurant.herokuapp.com";

		service.getAllCategories = function () {
			var defer = $q.defer();

			$http.get(service.endpoint + '/categories.json').then(function(response) {
				defer.resolve(response.data);
			}, function(response) {
				defer.reject(response);
			});

			return defer.promise;
		};

		service.getItemsForCategory = function (categoryShortName) {
			var defer = $q.defer();

			$http.get(service.endpoint + '/menu_items.json?category=' + categoryShortName).then(function(response) {
				defer.resolve(response.data);
			}, function(response) {
				defer.reject(response);
			});

			return defer.promise;
		};
	}
})();
