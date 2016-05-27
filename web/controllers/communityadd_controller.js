(function () {
  'use strict';

  angular
    .module('restApp')
    .controller('communityAddCtrl', communityAddCtrl);

  communityAddCtrl.$inject = ['$scope', '$http', '$routeParams'];
  function communityAddCtrl($scope, $http, $routeParams) {
    var  comAdd = this;

    // comAdd.getUserFromDb = function() {
    //   // search user in database
    //   var data = {
    //   username: comAdd.username,
    //   };
    //   var post = $http.post('rest.php/users/getuser', JSON.stringify(data))
    //     .then(successHandler)
    //     .catch(errorHandler);
    //   function successHandler(result) {
    //     comAdd.findUser = 'користувач "'+result.data.username+'" існує';
    //     comAdd.commissioner_id = result.data.id;
    //   }
    //   function errorHandler(result){
    //     console.log("Error"+result);
    //     comAdd.findUser = 'користувач "'+comAdd.username+'" відсутній у базі';
    //   }
    // };    

    comAdd.addCommunity = function() {
      console.log(comAdd);
      // add new community controller
      var dataMain = {
        com_name: comAdd.community.name,
        com_num: comAdd.community.num,
        com_adds: comAdd.community.additions
      };

      (function() {
        var post = $http.post('rest.php/communities/addcomm', JSON.stringify(dataMain))
          .then(successHandler)
          .catch(errorHandler);
        function successHandler(result) {
          console.log('Реєстрація пройшла успішно!');
          console.log(comAdd.community.name);
          $('.alert-success').toggle(); // show success alert
          comAdd.community = null;
          $scope.$setPristine(true);
          //window.location.href = '/'; //community list

        }
        function errorHandler(result){
          console.log("Error:"+result);
        }
      })();
      
    }
  }

})();