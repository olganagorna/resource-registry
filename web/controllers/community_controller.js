(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('UsersCommunity', UsersCommunity);

    UsersCommunity.$inject = ['$rootScope','$scope', '$http', 'PaginationServicee', 'constant', '$location'];
    function UsersCommunity($rootScope, $scope, $http, PaginationServicee, constant, $location) {
        
        $rootScope.xmlData = [];
        $rootScope.requestQuery = 'communities/show';
        $rootScope.parameters = [
            ['value', ''],
            ['name', ''],
            ['surname', '']
        ];
        $scope.searchingVal;

        (function(){
            return $http.get(constant.serviceBase + $rootScope.requestQuery)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                console.log($rootScope.xmlData);
            }
            function errorHandler(data){
                console.log("Can't render list!");
            }
        }());


        $scope.searchCommunity = function(community_name) {
            $scope.searchingVal = $scope.communitySearch;
            $http.get(constant.serviceBase + $rootScope.requestQuery + '?value=' + $scope.communitySearch)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        $scope.currentPage = PaginationServicee.currentPage;

        $scope.getPages = function(pageCount) {
            return PaginationServicee.getPages(pageCount);
        };

        $scope.switchPage = function(index){
            var intervalID = setInterval(function(){
                $scope.xmlDataLength = $rootScope.xmlData.length;
                if ($rootScope.xmlData._meta.perPage != undefined) {
                    if($scope.request){
                        PaginationServicee.switchPage($rootScope.requestQuery + '/search?' + buildQuery($scope.request)+ '&')
                            .then(function(data){
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    } else if ($scope.searchingVal) {
                        PaginationServicee.switchPage(index, $rootScope.requestQuery + "?value=" + $scope.searchingVal + "&")
                            .then(function(data){
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    } else {
                        PaginationServicee.switchPage(index, $rootScope.requestQuery + '?')
                            .then(function(data){
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }
                    clearInterval(intervalID);
                }

            },10);
        };
        
        $scope.switchPage($scope.currentPage);

        $scope.setPage = function(pageLink, pageType){
            PaginationServicee.setPage(pageLink, pageType, $rootScope.xmlData._meta.pageCount)
                .then(function(data){
                    $rootScope.xmlData = data.data;
                    $scope.currentPage = PaginationServicee.currentPage;
            });
        };

    }
})();