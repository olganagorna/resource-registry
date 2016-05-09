(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationServicee'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationServicee) {

        $rootScope.xmlData = [];
        $rootScope.requestQuery = 'users';
        $scope.roleSearch;
        $scope.searchingDone;
        
        (function (){
            return $http.get('rest.php/users/assignrole')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                console.log(data);
                $rootScope.xmlData = data.data;
                console.log(data.data);
            }
            function errorHandler(data){
                alert(data.data[0].message);
                console.log(data.data[0].message);
            }
        })();
        //Load resources per page
        // RestService.getData(constant.usersQuery + '?&per-page=' + constant.perPage)
        //     .then(function(data){
        //         $rootScope.xmlData = data.data;
        //         console.log(data.data);
        //     });
        //     console.log(constant.usersQuery + '?&per-page=' + constant.perPage)

        // console.log(constant.usersQuery); //returns admins/admin 
        
        //Pagination start
        $scope.currentPage = PaginationServicee.currentPage;
        console.log("current page is " + PaginationServicee.currentPage); //returns 1
        $scope.getPages = function(pageCount) {
            return PaginationServicee.getPages(pageCount);
        };

        $scope.switchPage = function(index){
            // console.log('req1 ' + request);
            var intervalID = setInterval(function(){
                $rootScope.xmlDataLength = $rootScope.xmlData.length;
                if ($rootScope.xmlData._meta.perPage != undefined) {
                    if($scope.request){
                        PaginationServicee.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
                            .then(function(data){
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;
                        });
                    }  else if ($scope.searchingDone) {
                        console.log("first");
                        PaginationServicee.switchPage(index, 'users/assignrole?value=' + $scope.searchingDone)
                            .then(function(data){
                                $rootScope.xmlData = data.data;
                                $scope.currentPage = PaginationServicee.currentPage;


                        });
                    } else {
         
                        console.log("second");
                        PaginationServicee.switchPage(index, constant.usersQuery + '?')
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
                console.log($rootScope.xmlData._meta.pageCount);
        };
        //Pagination end

        $scope.sort = function(sort_param){
            console.log($rootScope.xmlData);

            var orderBy = $filter('orderBy');
            $scope.order = function(predicate) {
                console.log(predicate);
                $scope.predicate = predicate;
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
                $rootScope.xmlData = orderBy($rootScope.xmlData, predicate, $scope.reverse);
                console.log("Sorted"+$rootScope.xmlData);
            };
            $scope.order(sort_param, true);
        }

        $scope.searchRole = function(role_name) {
           $scope.searchingDone = role_name;
            $http.get('http://rr.com/rest.php/users/assignrole?value='+ role_name)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };
    }

})();
