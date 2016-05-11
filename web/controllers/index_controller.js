(function(){
    'use strict';
    angular
        .module('restApp')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['RestService', '$route', '$routeParams', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function IndexCtrl(RestService, $route, $routeParams, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {
        $scope.obj = 1;
        $scope.xmlData = [];

        ($scope.getData = function() {
            return $http.get('rest.php/resource_classes')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                
                $scope.xmlData = result.data;
                console.log("aaaa" + $scope.xmlData);
            }
            function errorHandler(result){
                alert(result.data[0].message);
                console.log(result.data[0].message);
            }
        })();

        $scope.refreshData = function() {
            $scope.getData();
        };

        $scope.del = function(id){
            (function(){
                return $http.delete('rest.php/resource_classes/' + id)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                    alert('Êëàñ óñï³øíî âèäàëåíèé');
                    $route.reload();
                }
                function errorHandler(result){
                    alert(result.data[0].message);
                    console.log(result.data[0].message);
                }
            }());
        };
        $scope.addClass = function(){
            console.log($scope.addClassInput);
            var classObj = {
                name: $scope.addClassInput
            };
            (function(){
                return $http.post('rest.php/resource_classes',classObj)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                    alert('Êëàñ óñï³øíî Äîäàíèé');
                    $route.reload();
                }
                function errorHandler(result){
                    alert(result.data[0].message);
                    console.log(result.data[0].message);
                }
            }());
        };

        // Pagination start
        $scope.currentPage = PaginationService.currentPage;
        $scope.getPages = function(pageCount) {
            return PaginationService.getPages(pageCount);
        };

        $scope.switchPage = function(index) {
            if($scope.request) {
                PaginationService.switchPage(index, constant.resource_classesQuery + '/search?' + buildQuery($scope.request)+ '&')
                    .then(function(result) {
                        $scope.xmlData = result.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }  else if ($scope.searchingDone) {
                PaginationService.switchPage(index, 'resource_classes?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
                    .then(function(result) {
                        $scope.xmlData = result.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else {
                PaginationService.switchPage(index, constant.resource_classesQuery + '?')
                    .then(function(result) {
                        $scope.xmlData = result.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }
        };
        $scope.switchPage($scope.currentPage);
        $scope.setPage = function(pageLink, pageType) {
            PaginationService.setPage(pageLink, pageType, $scope.xmlData._meta.pageCount)
                .then(function(data) {
                    $scope.xmlData = data.data;
                    $scope.currentPage = PaginationService.currentPage;
            });
        };
        //Pagination end

        $scope.changeActivationStatus = function(activation_status, class_id) {
            $http.get('rest.php/resource_classes/changeactivationstatus?class_id='+ class_id + '&' + 'activation_status=' + activation_status)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.getData();
            }
            function errorHandler() {
                console.log("Can't change activation status!");
            }
        };
    };


})();