(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {

        $rootScope.xmlData = [];
        $scope.roleFilter;
        $scope.userSearch;
        $scope.sortingDone;
        $scope.roleFound = [];
        
        ($scope.getData = function() {
            return $http.get('rest.php/users/userdata')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
            }
        })();

        $scope.refreshData = function() {
            $scope.getData();
        }

        //Pagination start
        $scope.currentPage = PaginationServicee.currentPage;
        $scope.getPages = function(pageCount) {
            return PaginationServicee.getPages(pageCount);
        };

        $scope.switchPage = function(index) {
            var intervalID = setInterval(function(){
                $rootScope.xmlDataLength = $rootScope.xmlData.length;
                if ($rootScope.xmlData._meta.perPage != undefined) {
                    if($scope.request) {
                        PaginationServicee.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }  else if ($scope.searchingDone) {
                        PaginationServicee.switchPage(index, 'users/userdata?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    } else {
                        PaginationServicee.switchPage(index, constant.usersQuery + '?')
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }    
                    clearInterval(intervalID);
                }

            },10);
        };
        $scope.switchPage($scope.currentPage);
        $scope.setPage = function(pageLink, pageType) {
            PaginationServicee.setPage(pageLink, pageType, $rootScope.xmlData._meta.pageCount)
                .then(function(data) {
                    $rootScope.xmlData = data.data;
                    $scope.currentPage = PaginationServicee.currentPage;
            });
        };
        //Pagination end

        // filtering by role
        $scope.filterRole = function(role_name) {
            $http.get('rest.php/users/userdata?value='+ role_name)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data) {
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
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
            }
        };

        // sort by name
        $scope.sortName = function() {
            if($scope.sort_order == "desc") {
                $scope.sort_order = "asc";
            } else {
                $scope.sort_order = "desc";
            }
            $http.get('rest.php/users/userdata?sort=' + $scope.sort_order)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
            }
        };

        // activate or deactivate user
        $scope.changeActivationStatus = function(activation_status, user_id) {
            $http.get('rest.php/users/changeactivationstatus?user_id='+ user_id + '&' + 'activation_status=' + activation_status)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.refreshData();
            }
            function errorHandler() {
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
            }
            function errorHandler(data) {
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
            function errorHandler() {
                console.log("Can't reload list!");
            }
        };
    }
})();

