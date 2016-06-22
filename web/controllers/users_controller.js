(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {

        $rootScope.xmlData = [];
	    $rootScope.xmlData.items = [];
        $scope.roleFilter;
        $scope.userSearch;
        $scope.sortingDone;
        $scope.roleFound = [];
        $scope.communityFound = [];
        $scope.currentCommId = (angular.fromJson(sessionStorage.user)).communityId;

        $scope.modifyRoleName = function() {
            var toEquate = {
                    "user": "Співвласник",
                    "registrar": "Реєстратор",
                    "admin": "Адміністратор",
                    "commissioner": "Уповноважений"
                };
                
                for(var i = 0; i < $rootScope.xmlData.items.length; i++) {
                    $rootScope.xmlData.items[i].role_name = toEquate[$rootScope.xmlData.items[i].role_name];
                }
        };
        
        if($scope.currentCommId === null) {
            $scope.currentCommId = "";
        }

        ($scope.getData = function() {
            return $http.get('rest.php/' + constant.usersQuery + '?currentCommId=' + $scope.currentCommId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                $scope.modifyRoleName();
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        })();

        ($scope.getAtcStat = function() {
            return $http.get('rest.php/' + constant.usersQuery + '?currentCommId=' + $scope.currentCommId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.xmlData.activation_status = [];
                for(var i = 0; i<$scope.xmlData.items.length; i++){
                    $scope.xmlData.activation_status.push($scope.xmlData.items[i].activation_status);
                }
            }
            function errorHandler(data) {
                //Here will be errorhandler
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
                if ($rootScope.xmlData.items.length > 0) {
                    if($scope.request) {
                        PaginationServicee.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.modifyRoleName();
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }  else if ($scope.sortingDone) {
                        PaginationServicee.switchPage(index, constant.usersQuery + '?value=' + $scope.sortingDone + "&page=" + index + "&per-page=" + constant.perPage)
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.modifyRoleName();
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    } else {
                        PaginationServicee.switchPage(index, constant.usersQuery + '?currentCommId=' + $scope.currentCommId + '&')
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.modifyRoleName();
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
                    $scope.modifyRoleName();
                    $scope.currentPage = PaginationServicee.currentPage;
            });
        };
        // //Pagination end

        // filtering by role
        $scope.filterRole = function(role_name) {
            $http.get('rest.php/' + constant.usersQuery +'?value='+ role_name + '&currentCommId=' + $scope.currentCommId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                $scope.modifyRoleName();
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        };

        // searching by first and last name
        $scope.searchUser = function(search_query) {
            $http.get('rest.php/' + constant.usersQuery + '?value=' + search_query + '&currentCommId=' + $scope.currentCommId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                $scope.modifyRoleName();
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        };

        // sort by name
        $scope.sortName = function() {
            if($scope.sort_order == "desc") {
                $scope.sort_order = "asc";
            } else {
                $scope.sort_order = "desc";
            }
            $http.get('rest.php/' + constant.usersQuery + '?sort=' + $scope.sort_order + '&currentCommId=' + $scope.currentCommId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                $scope.modifyRoleName();
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        };

        // activate or deactivate user
        $scope.changeActivationStatus = function(activation_status, user_id, role_id, community_id) {
            if (confirm("Ви справді бажаєте змінити статус активації цього користувача?") == true) {
                $http.get('rest.php/users/changeactivationstatus?user_id='+ user_id + '&' + 'activation_status=' + activation_status + '&role_id=' + role_id + '&community_id=' + community_id)
                    .then(successHandler)
                    .catch(errorHandler);
            }
            function successHandler(status) {
                $scope.getAtcStat();
            }
            function errorHandler(status) {
                alertPopup(status.status);
            }
        };

        // get list of roles
        (function(){
            return $http.get('rest.php/users/getrole')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.roleFound = data.data.items;

                var toEquate = {
                    "user": "Співвласник",
                    "registrar": "Реєстратор",
                    "admin": "Адміністратор",
                    "commissioner": "Уповноважений"
                };
                
                for(var i = 0; i < $scope.roleFound.length; i++) {
                    $scope.roleFound[i].role_name = toEquate[$scope.roleFound[i].role_name];
                }
                
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        }());

        // change user role
        $scope.changeRole = function (changeRoleId, user_id) {
            $scope.role = {
                role_id: changeRoleId,
                user_id: user_id
            }
            $http.post('rest.php/users/changerole', JSON.stringify($scope.role))
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.refreshData();
            }
            function errorHandler() {
                //Here will be errorhandler
            }
        };

        // get list of communities
        (function(){
            return $http.get('rest.php/communities/show')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.communityFound = data.data.items;             
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        }());

        // change user community
        $scope.changeCommunity = function(changeComId, user_id) {
            $scope.community = {
                community_id: changeComId,
                user_id: user_id
            }
            $http.post('rest.php/users/changecommunity', JSON.stringify($scope.community))
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.refreshData();
            }
            function errorHandler() {
                //Here will be errorhandler
            }
        }

        function alertPopup(argument) {
            if(argument==200) {
                alert("Статус користувача змінено!");    
            } else if(argument==422) {
                alert('Неможливо змінити статус користувача');    
            }  
        }
    }
})();

