(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.controller('NewItemController', NewItemController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
	var toBuyCtrl = this;

	toBuyCtrl.items = ShoppingListCheckOffService.toBuy;
	toBuyCtrl.buyItem = function(index) {
		ShoppingListCheckOffService.buyItem(index);
	};
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
	var boughtCtrl = this;

	boughtCtrl.items = ShoppingListCheckOffService.bought;
	boughtCtrl.returnItem = function(index) {
		ShoppingListCheckOffService.returnItem(index);
	};
}

NewItemController.$inject = ['ShoppingListCheckOffService'];
function NewItemController(ShoppingListCheckOffService) {
	var newItemCtrl = this;

	newItemCtrl.name = '';
	newItemCtrl.quantity = 1;
	newItemCtrl.addItem = function() {
		ShoppingListCheckOffService.addItem(newItemCtrl.name, newItemCtrl.quantity);
		newItemCtrl.name = '';
		newItemCtrl.quantity = 1;
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
