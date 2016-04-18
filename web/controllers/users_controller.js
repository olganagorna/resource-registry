(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['RestService', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function UsersController(RestService, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {

        $scope.list_users = [];
        
        (function (){
            return $http.get('rest.php/admins/admin')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                console.log(data);
                $scope.list_users = data.data;
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
        //         $scope.list_users = data.data;
        //         console.log(data.data);
        //     });
        //     console.log(constant.usersQuery + '?&per-page=' + constant.perPage)

        // console.log(constant.usersQuery); //returns admins/admin 
        
        //Pagination start
        $scope.currentPage = PaginationService.currentPage;
        console.log("current page is " + PaginationService.currentPage); //returns 1
        $scope.getPages = function(pageCount) {
            return PaginationService.getPages(pageCount);
        };

        $scope.switchPage = function(index){
            if($scope.request){
                PaginationService.switchPage(index, constant.usersQuery + '/search?' + buildQuery($scope.request)+ '&')
                    .then(function(data){
                        $scope.list_users = data.data;
                        $scope.currentPage = PaginationService.currentPage;
                });
            }else {
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

        $scope.sort = function(sort_param){
            console.log($scope.list_users);

            var orderBy = $filter('orderBy');
            $scope.order = function(predicate) {
                console.log(predicate);
                $scope.predicate = predicate;
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
                $scope.list_users = orderBy($scope.list_users, predicate, $scope.reverse);
                console.log("Sorted"+$scope.list_users);
            };
            $scope.order(sort_param, true);
        }
    }

})();
