(function(){
    'use strict';
    angular.module('restApp')

        .controller('MainCtrl', ['$scope', '$location', 'rrVersion', function($scope, $location, rrVersion) {
            $scope.rrVersion = rrVersion.version;
            
            //$scope.activePills = $location.url();

            ($scope.activatePills = function() {
            	setTimeout(function() {
            		$scope.activePills = $location.url();
            	},10);
            })();   
       }]);


})();
