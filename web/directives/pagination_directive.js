(function () {

	'use strict';

	angular.module('restApp').directive("paginationDirective", function () {

		return {
			restrict: 'E',
			templateUrl: 'views/site/pagination.html'
			
		};

	});


})();