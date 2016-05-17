(function(){
    'use strict';
    angular.module('restApp')

        .controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', 'rrVersion', function($scope, $rootScope, $http, $location, rrVersion) {
            $scope.rrVersion = rrVersion.version;
       }]);


})();
