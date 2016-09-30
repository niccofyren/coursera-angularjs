(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiEndpoint', 'https://davids-restaurant.herokuapp.com');


	/*
	 * I implemented this as a simple directive, and not combined with an extra
	 * FoundItemsDirectiveController.
	 *
	 * The assignment was unclear on what the specific structure should be, so I went
	 * for a simple solution. This seems apropriate since the list directive should not
	 * manipulate any "found" items directly, only throught the NarrowItDownController's
	 * methods passed to it. And thus it does not need its own controller.
	 *
	 * PS. We also use the 'good' method binding using '&' for passing the method as a reference
	 */
	function FoundItemsDirective () {
		var ddo = {
			restrict: 'E',
			scope: {
				foundItems: '<',
				onRemove: '&'
			},
			templateUrl: 'founditems.html'
		};
		return ddo;
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {
		var ctrl = this;
		ctrl.found = [];

		ctrl.getMatchedMenuItems = function () {
			var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

			promise.then(function (result) {
				ctrl.found = result;
			}, function (error) {
				console.log("Error loading menu choices: ", error);
			});
		};

		ctrl.removeItem = function (index) {
			ctrl.found.splice(index, 1);
		};
	}

	MenuSearchService.$inject = ['$http', '$q', '$filter', 'ApiEndpoint'];
	function MenuSearchService ($http, $q, $filter, ApiEndpoint) {
		var service = this;
		service.getMatchedMenuItems = function (searchTerm) {
			var menuItems = service.getMenuItems();
			var deferred = $q.defer();

			menuItems.then(function (result) {
				deferred.resolve(
						$filter('filter')(
							result.data.menu_items,
							{description: searchTerm}
						)
				);
			})
			.catch(function (error) {
				deferred.reject();
			});

			return deferred.promise;
		};

		service.getMenuItems = function () {
			var promise = $http({
				method: 'GET',
				url: (ApiEndpoint + "/menu_items.json")
			});

			return promise;
		};
	}
})();
