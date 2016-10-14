(function() {
	'use strict';

	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider

		.state('home', {
			url: '/',
			template: '<h1>Welcome to our Restaurant!</h1><img src="img/restaurant.gif" style="width: 100%; height: auto;"/>'
		})

		.state('categories', {
			url: '/categories',
			template: '<categories items="catsCtrl.items"></categories>',
			controller: 'CategoriesController as catsCtrl',
			resolve: {
				items: ['MenuDataService', function(MenuDataService) {
					return MenuDataService.getAllCategories();
				}]
			}
		})

		.state('items', {
			url: '/items/{catId}',
			template: '<items items="itemsCtrl.items" name="itemsCtrl.name"></items>',
			controller: 'ItemsController as itemsCtrl',
			resolve: {
				category: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
					return MenuDataService.getItemsForCategory($stateParams.catId);
				}]
			}
		});
	}
})();
