(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('ResClassAttrCtrl', ResClassAttrCtrl);

    ResClassAttrCtrl.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function ResClassAttrCtrl(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {
        console.log(1);

    }
})();

