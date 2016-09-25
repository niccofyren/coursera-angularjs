(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.controller('NewItemController', NewItemController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyShoppingController($scope, ShoppingListCheckOffService) {
	$scope.items = ShoppingListCheckOffService.toBuy;

	$scope.buyItem = function(index) {
		ShoppingListCheckOffService.buyItem(index);
	};
}

AlreadyBoughtShoppingController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController($scope, ShoppingListCheckOffService) {
	$scope.items = ShoppingListCheckOffService.bought;

	$scope.returnItem = function(index) {
		ShoppingListCheckOffService.returnItem(index);
	};
}

NewItemController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function NewItemController($scope, ShoppingListCheckOffService) {
	$scope.name = '';
	$scope.quantity = 1;
	$scope.addItem = function() {
		ShoppingListCheckOffService.addItem($scope.name, $scope.quantity);
		$scope.name = '';
		$scope.quantity = 1;
	};
}

ShoppingListCheckOffService.$inject = ['$filter'];
function ShoppingListCheckOffService ($filter) {
	this.toBuy = [
		{ name: "slippers", quantity: 3.5 },
		{ name: "trucks", quantity: 9 },
		{ name: "spoons", quantity: 42 },
		{ name: "soda cans", quantity: 100 },
		{ name: "magnets", quantity: 4 },
	];
	this.bought = [];

	this.buyItem = function (index) {
		this.bought.push(this.toBuy[index]);
		this.toBuy.splice(index, 1);
	};

	this.returnItem = function (index) {
		this.toBuy.push(this.bought[index]);
		this.bought.splice(index, 1);
	};

	this.addItem = function (name, quantity) {
		var item = {
			name: $filter('lowercase')(name),
			quantity: quantity,
		};
		this.toBuy.push(item);
	};
}



})();
