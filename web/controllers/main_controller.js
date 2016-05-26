(function(){
    'use strict';
    angular.module('restApp')

        .controller('MainCtrl', ['$scope', 'rrVersion', function($scope, rrVersion) {
            $scope.rrVersion = rrVersion.version;
       }]);


})();
