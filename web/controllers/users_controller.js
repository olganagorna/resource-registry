(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {

        $scope.list_users = [];
        $scope.roleFilter;
        $scope.userSearch;
        $scope.sortingDone;
        $scope.roleFound = [];
        
        ($scope.getData = function(){
            return $http.get('rest.php/users/userdata')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        })();

        $scope.refreshData = function(){
            $scope.getData();
        }

        //Pagination start
        $scope.currentPage = PaginationService.currentPage;
        console.log("current page is " + PaginationService.currentPage); //returns 1
        $scope.getPages = function(pageCount) {
            return PaginationService.getPages(pageCount);
        };

        $scope.switchPage = function(index){
            // console.log('req1 ' + request);
            if($scope.request){
                PaginationService.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
                    .then(function(data){
                        $scope.list_users = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }  else if ($scope.searchingDone) {
                console.log("first");
                PaginationService.switchPage(index, 'users/userdata?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
                    .then(function(data){
                        $scope.list_users = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            } else {
                console.log("second");
                PaginationService.switchPage(index, constant.usersQuery + '?')
                    .then(function(data){
                        $scope.list_users = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }
        };
        $scope.switchPage($scope.currentPage);
        $scope.setPage = function(pageLink, pageType){
            PaginationService.setPage(pageLink, pageType, $scope.list_users._meta.pageCount)
                .then(function(data){
                    $scope.list_users = data.data;
                    $scope.currentPage = PaginationService.currentPage;
            });
                console.log($scope.list_users._meta.pageCount);
        };
        //Pagination end

        // filtering by role
        $scope.filterRole = function(role_name) {
            $http.get('rest.php/users/userdata?value='+ role_name)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        // searching by first and last name
        $scope.searchUser = function(search_query) {
            console.log($scope.searchingDone);
            $http.get('rest.php/users/userdata?value='+ search_query)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        // sort by name
        $scope.sortName = function() {
            if($scope.sort_order == "desc"){
                $scope.sort_order = "asc";
            } else {
                $scope.sort_order = "desc";
            }
            $http.get('rest.php/users/userdata?sort=' + $scope.sort_order)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        $scope.changeActivationStatus = function(activation_status, user_id){
            $http.get('rest.php/users/changeactivationstatus?user_id='+ user_id + '&' + 'activated=' + activation_status)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.refreshData();
            }
            function errorHandler(){
                console.log("Can't change activation status!");
            }
        };

        // get list of roles
        (function(){
            return $http.get('rest.php/users/getrole')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.roleFound = data.data.items;
                console.log($scope.roleFound);
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        }());

        // change user role
        $scope.changeRole = function (changeRoleId, user_id) {
            $http.get("rest.php/users/changerole?" + "user_id=" + user_id + "&role_id=" + changeRoleId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.refreshData();
            }
            function errorHandler(){
                console.log("Can't reload list!");
            }
        };
    }
})();

