(function () {
   'use strict';

    angular
        .module('restApp')
        .controller('RequestsController', RequestsController);

    RequestsController.$inject = ['$scope', '$http', 'PaginationService', 'constant'];
    function RequestsController($scope, $http, PaginationService, constant, $location) {

        $scope.requests = [];
        $scope.searchingVal;

        (function(){
            return $http.get('rest.php/requests/showrequest')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                console.log("lets start");
                console.log(typeof data.data);
                $scope.requests = data.data;
                $scope.requests.create_time = Date(data.data.create_time);
            }
            function errorHandler(result){
                console.log("Can't render list!");
            }
        }());

        $scope.searchRequest = function(sender, recipient) { // must provided two arguments

            $scope.searchingVal = $scope.requestSearch;
            console.log($scope.searchingVal);
            $http.get('rest.php/requests/showrequest?value='+ $scope.requestSearch)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.requests = data.data;
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
    }
})();