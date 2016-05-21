(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('ResourceClassAttributeController', ResourceClassAttributeController);

    ResourceClassAttributeController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function ResourceClassAttributeController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {

        $rootScope.xmlData = [];


        ($scope.getData = function() {
            return $http.get('rest.php/attribute_class_view')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
                console.log($rootScope.xmlData);
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
                                $scope.modifyRoleName();
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }  else if ($scope.searchingDone) {
                        PaginationServicee.switchPage(index, 'users/userdata?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
                            .then(function(data) {
                                $rootScope.xmlData = data.data;
                                $scope.modifyRoleName();
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    } else {
                        PaginationServicee.switchPage(index, constant.usersQuery + '?')
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


        // activate or deactivate user
        // $scope.changeActivationStatus = function(activation_status, user_id) {
        //     $http.get('rest.php/users/changeactivationstatus?user_id='+ user_id + '&' + 'activation_status=' + activation_status)
        //         .then(successHandler)
        //         .catch(errorHandler);
        //     function successHandler() {
        //         $scope.refreshData();
        //     }
        //     function errorHandler() {
        //         console.log("Can't change activation status!");
        //     }
        // };



    }
})();

