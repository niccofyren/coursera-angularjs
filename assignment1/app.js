(function() {
'use strict'

angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.lunchList = "";
	$scope.lunchMessage = "";
	$scope.invalidInput = false;
	$scope.validInput = false;

	$scope.checkIfToMuch = function() {
		// Convert input field string to array of items
		var lunchListArray = splitStringToArray($scope.lunchList);
		// Count the number of "non-blank" items in the array
		var validItemCount = countValidItems(lunchListArray);

		// We do not know if the new input is valid, invalid or something else
		$scope.invalidInput = false;
		$scope.validInput = false;

		if(validItemCount == 0) {
			$scope.lunchMessage = "Please enter data first";
			$scope.invalidInput = true;
		} else if(validItemCount <= 3) {
			$scope.lunchMessage = "Enjoy!";
			$scope.validInput = true;
		} else if(validItemCount > 3) {
			$scope.lunchMessage = "To much!";
			$scope.validInput = true;
		}
	}

	function splitStringToArray(string){
		return string.split(",");
	};

	function countValidItems(items) {
		var validCount = 0;

		for (var i = 0, len = items.length; i < len; i++) {
			if(items[i].trim() != "") {
				validCount += 1;
			}
		}

		return validCount;
	};
}
})();
