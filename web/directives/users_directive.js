(function () {

	'use strict';

	angular.module('restApp').directive("usersList", function () {

		return {
			restrict: 'E',
			templateUrl: 'views/site/users.html',
			controller: 'UsersController'
			
		};

	});


})();
