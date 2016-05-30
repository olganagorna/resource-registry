(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('UsersCommunity', UsersCommunity);

    UsersCommunity.$inject = ['$scope', '$http', 'PaginationService', 'constant', '$location'];
    function UsersCommunity($scope, $http, PaginationService, constant, $location) {

        $scope.communities = [];
        $scope.searchingVal = "";
        console.log($scope.searchingVal + "<-");
        $scope.orderBy = "ASC";

        (function(){
            return $http.get('rest.php/communities/show')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communities = data.data;
                console.log($scope.communities);
            }
            function errorHandler(data){
                console.log("Can't render list!");
            }
        }());

        $scope.searchCommunity = function(community_name) {
            if ($scope.communitySearch) {
                $scope.searchingVal = $scope.communitySearch;
            } else {
                $scope.searchingVal = "";
            }


            $http.get('rest.php/communities/show?search='+ $scope.searchingVal + "&order=" + $scope.orderBy)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communities = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        $scope.chngActiveStatus = function(data, status) {
            var prev_stat = data.isactive;
            data.isactive = status;
            var post = $http.put('rest.php/communities/'+data.community_id, data)
            .catch(errorHandler);

            function errorHandler(result){
                data.isactive = prev_stat;
            }
        };

        //Pagination start

        $scope.currentPage = PaginationService.currentPage;

        $scope.getPages = function(pageCount) {
            return PaginationService.getPages(pageCount);
        };

        $scope.changeOrder = function() {
            if ($scope.orderBy == "ASC") {
                $scope.orderBy = "DESC";

            } else {
                $scope.orderBy = "ASC";
            }

            $http.get('rest.php/communities/show?search='+ $scope.searchingVal + "&order=" + $scope.orderBy)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communities = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
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
                PaginationService.switchPage(index, 'communities/show?search='+ $scope.searchingVal + "&order=" + $scope.orderBy + "&page=" + index + "&per-page=" + constant.perPage)
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