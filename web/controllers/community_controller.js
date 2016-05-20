(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('UsersCommunity', UsersCommunity);

    UsersCommunity.$inject = ['$scope', '$http', 'PaginationService', 'constant', '$location'];
    function UsersCommunity($scope, $http, PaginationService, constant, $location) {

        $scope.communities = [];
        $scope.searchingVal;
        (function(){
            return $http.get('rest.php/communities/show')

                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communities = data.data;
            }
            function errorHandler(data){
                console.log("Can't render list!");
            }
        }());







        $scope.searchCommunity = function(community_name) {

            $scope.searchingVal = $scope.communitySearch;

            $http.get('http://rr.com/rest.php/communities/show?value='+ $scope.communitySearch)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communities = data.data;
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
                        $scope.communities = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else if ($scope.searchingVal) {
                 console.log(constant.perPage);
                PaginationService.switchPage(index, "communities/show?value=" + $scope.searchingVal + "&page=" + index + "&per-page=" + constant.perPage)
                    .then(function(data){
                        $scope.communities = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else {
                 console.log("third");
                PaginationService.switchPage(index, constant.communitiesQuery + "/show" + '?')
                    .then(function(data){
                        $scope.communities = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }

        };


        


        $scope.switchPage($scope.currentPage);

        $scope.setPage = function(pageLink, pageType){
            PaginationService.setPage(pageLink, pageType, $scope.communities._meta.pageCount)
                .then(function(data){
                    $scope.communities = data.data;
                    $scope.currentPage = PaginationService.currentPage;
            });
        };
    }
})();