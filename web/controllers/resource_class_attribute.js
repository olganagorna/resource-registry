(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('ResClassAttrCtrl', ResClassAttrCtrl);

    ResClassAttrCtrl.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function ResClassAttrCtrl(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {
        console.log(1);
        $rootScope.resourceAttributes = [];
        // $rootScope.searchByClassId;

        ($scope.getAttr = function(class_id) {
            return $http.get('rest.php/attribute_class_views/attribute?value=' + class_id)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.resourceAttributes = data.data;
                console.log($rootScope.resourceAttributes);
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
            }
        })();

        // $scope.refreshData = function() {
        //     $scope.getData();
        // }

        // $scope.searchByClassId = function(class_id) {
        //     return $http.get('rest.php/attribute_class_views/attribute?value=' + class_id)
        //         .then(successHandler)
        //         .catch(errorHandler);
        //     function successHandler(data) {
        //         $rootScope.resourceAttributes = data.data;
        //         console.log($rootScope.resourceAttributes);
        //     }
        //     function errorHandler(data) {
        //         console.log("Can't reload list!");
        //     }
        // }




    }
})();

