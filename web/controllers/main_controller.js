(function(){
    'use strict';
    angular.module('restApp')

        .controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', 'rrVersion', function($scope, $rootScope, $http, $location, rrVersion) {
            $rootScope.currentUser = angular.fromJson(sessionStorage.getItem('user'));
            $scope.rrVersion = rrVersion.version;
       }]);


})();
