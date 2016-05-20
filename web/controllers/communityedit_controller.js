(function () {
   'use strict';

   angular
       .module('restApp')
       .controller('CommEditCtrl', CommEditCtrl);

   CommEditCtrl.$inject = ['$scope', '$http', '$routeParams'];
   function CommEditCtrl($scope, $http, $routeParams) {
       var commEdit = this;
       commEdit.communId = $routeParams.communityId;
       commEdit.name = 'error';

       (function(){
           var get = $http.get('rest.php/communities/'+commEdit.communId)
               .then(successHandler)
               .catch(errorHandler);
           function successHandler(result) {
                  commEdit.name = result.data.name;
                  commEdit.prefix = result.data.prefix;
                  commEdit.notes = result.data.notes;

           }
           function errorHandler(result){
               alert(result.data[0].message);
               //console.log(result.data[0].message);
           }

       }());
            

   }
})();