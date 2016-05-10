(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('Requests', Requests);

    Requests.$inject = ['$scope', '$http', 'PaginationService', 'constant', '$location'];
    function Requests($scope, $http, PaginationService, constant, $location) {

        $scope.requests = [];
        $scope.searchingVal;
        (function(){
            return $http.get('rest.php/requests/showrequest')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.requests = data.data;console.log("lets start");
            }
            function errorHandler(data){
                console.log("Can't render list!");
            }
        }());

        $scope.searchRequest = function(sender, recipient) { // must provided two arguments

            $scope.searchingVal = $scope.requestSearch;
            console.log($scope.searchingVal);
            $http.get('rest.php/requests/showrequest?value='+ $scope.requestSearch)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.requests = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        //Pagination start

        $scope.currentPage = PaginationService.currentPage;

        $scope.getPages = function(pageCount) {
            return PaginationService.getPages(pageCount);
        };

        $scope.switchPage = function(index){
            if($scope.request){
                console.log("first");
                PaginationService.switchPage(index, constant.communitiesQuery + '/search?' + buildQuery($scope.request)+ '&')
                    .then(function(data){
                        $scope.requests = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else if ($scope.searchingVal) {
                 console.log(constant.perPage);
                PaginationService.switchPage(index, "requests/show?value=" + $scope.searchingVal + "&page=" + index + "&per-page=" + constant.perPage)
                    .then(function(data){
                        $scope.requests = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else {
                 console.log("third");
                PaginationService.switchPage(index, constant.communitiesQuery + "/show" + '?')
                    .then(function(data){
                        $scope.requests = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }
        };

        $scope.switchPage($scope.currentPage);

        $scope.setPage = function(pageLink, pageType){
            PaginationService.setPage(pageLink, pageType, $scope.requests._meta.pageCount)
                .then(function(data){
                    $scope.requests = data.data;
                    $scope.currentPage = PaginationService.currentPage;
            });
        };
    }
})();