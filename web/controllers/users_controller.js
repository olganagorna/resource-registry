(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {

        $scope.list_users = [];
        $scope.roleFilter;
        $scope.filteringDone;
        $scope.userSearch;
        $scope.searchingDone;
        $scope.sortingDone;
        $scope.roleFound = [];
        // $scope.roles = [];
        // $scope.roleGet;
        // $scope.activated;
        // $scope.nameuser;
        
        (function (){
            return $http.get('rest.php/users/userdata')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
                console.log($scope.list_users);
            }
            function errorHandler(data){
                alert(data.data[0].message);
                console.log(data.data[0].message);
            }
        })();

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
            $scope.filteringDone = role_name;
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
            $scope.searchingDone = search_query;
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

        $scope.changeActivationStatus = function(activation_status, index){
            $scope.activated = activation_status;

            $http.get('rest.php/users/changeactivationstatus?username='+ $scope.list_users.items[0].username + '&' + 'activated=' + activation_status)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.list_users = data.data;
            }
            function errorHandler(data){
                console.log("Can't change activation status!");
            }
            function getUsername(){
                $scope.nameuser = username;
                var username = angular.element('#deact-button-0');
                console.log(username);
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
        $scope.changeRole = function (changeRoleId, userId) {
            var newRole = new Object();
            newRole.new_role_id = changeRoleId;
            newRole.user_id = userId;
            userId = $scope.list_users.items[0].user_id;
            console.log(userId);
            (function(){
                $http.get("rest.php/users/changerole?" + "user_id=" + userId + "&role_id=" + changeRoleId)
                // var post = $http.post("rest.php/users/changerole", JSON.stringify(newRole))
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(data) {
                    $scope.list_users = data.data;
                }
                function errorHandler(data){
                    console.log("Can't reload list!");
                }
            }());
        };

        // add new user
        // $scope.addUser = function(search_query) {
        //     $scope.searchingDone = search_query;
        //     console.log($scope.searchingDone);
        //     $http.get('rest.php/users/userdata?value='+ search_query)
        //         .then(successHandler)
        //         .catch(errorHandler);
        //     function successHandler(data) {
        //         $scope.list_users = data.data;
        //     }
        //     function errorHandler(data){
        //         console.log("Can't reload list!");
        //     }
        // };
    }
})();


