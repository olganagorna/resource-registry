(function () {
   'use strict';

   angular
       .module('restApp')
       .controller('CommissionerCtrl', CommissionerCtrl);

   CommissionerCtrl.$inject = ['$scope', '$http'];
   function CommissionerCtrl($scope, $http) {
       var commissCtrl = this;
       commissCtrl.users = [];
       (function(){
           return $http.get('rest.php/communities')
               .then(successHandler)
               .catch(errorHandler);
           function successHandler(result) {
               console.log(result);
               commissCtrl.users = result.data;
           }
           function errorHandler(result){
               alert(result.data[0].message);
               console.log(result.data[0].message);
           }
       }());
   }
})();