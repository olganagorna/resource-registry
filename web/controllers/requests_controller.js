(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', '$http', 'PaginationServicee', 'constant', '$location', '$rootScope'];
    function RequestsController($scope, $http, PaginationServicee, constant, $location, $rootScope) {

        $rootScope.xmlData = [];
        $rootScope.requestQuery = 'requests/showrequest';
        $scope.searchingVal;

        (function(){
            return $http.get('rest.php/requests/showrequest')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                console.log("lets start");
                console.log(typeof data.data);
                $rootScope.xmlData = data.data;
                $scope.requests.create_time = Date(data.data.create_time);
            }
            function errorHandler(result){
                console.log("Can't render list!");
            }
        }());

        $scope.searchRequest = function(requestSearch) {
            console.log($scope.searchingVal);
            $http.get('rest.php/requests/showrequest?value='+ $scope.requestSearch)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.xmlData = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

        // $scope.addRequest = function() {
        //   // add new community controller
        //   var data = {
        //     // type: $scope.requests.type,
        //     // sender: $scope.requests.sender,
        //     // reciever: $scope.requests.reciever,
        //     // status: $scope.requests.status
        //     type: '2',
        //     sender: '25',
        //     reciever: '31',
        //     status: '2'
        //   };

        //   (function() {
        //     var post = $http.post('rest.php/requests/addreq', JSON.stringify(data))
        //       .then(successHandler)
        //       .catch(errorHandler);
        //     function successHandler(result) {
        //       console.log('Реєстрація пройшла успішно!');
        //     }
        //     function errorHandler(result){
        //       console.log("Error:"+result);
        //     }
        //   })();  
        // }  

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
                       PaginationServicee.switchPage(index, $rootScope.requestQuery + '/search?' + buildQuery($scope.request)+ '&')
                           .then(function(data) {
                               $rootScope.xmlData = data.data;
                               $scope.currentPage = PaginationServicee.currentPage;
                       });
                   }  else if ($scope.searchingDone) {
                       PaginationServicee.switchPage(index, $rootScope.requestQuery + '?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
                           .then(function(data) {
                               $rootScope.xmlData = data.data;
                               $scope.currentPage = PaginationServicee.currentPage;
                       });
                   } else {
                       PaginationServicee.switchPage(index, $rootScope.requestQuery + '?')
                           .then(function(data) {
                               $rootScope.xmlData = data.data;
                               $scope.currentPage = PaginationServicee.currentPage;
                       });
                   }    
                   clearInterval(intervalID);
               }

           },1000);
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
    }
})();