(function () {
  'use strict';

  angular
    .module('restApp')
    .controller('communityAddCtrl', communityAddCtrl);

  communityAddCtrl.$inject = ['$scope', '$http', '$routeParams'];
  function communityAddCtrl($scope, $http, $routeParams) {
    var  comAdd = this;

    comAdd.getUserFromDb = function() {
      // search user in database
      var data = {
      username: comAdd.username,
      };
      var post = $http.post('rest.php/users/getuser', JSON.stringify(data))
        .then(successHandler)
        .catch(errorHandler);
      function successHandler(result) {
        comAdd.findUser = 'користувач "'+result.data.username+'" існує';
        comAdd.commissioner_id = result.data.id;
      }
      function errorHandler(result){
        console.log("Error"+result);
        comAdd.findUser = 'користувач "'+comAdd.username+'" відсутній у базі';
      }
    };

    comAdd.addCommunity = function(){
      // add new community controller
      var dataMain = new Object();

      dataMain.community_name = comAdd.community_name;
      dataMain.community_num = comAdd.community_num;
      dataMain.commissioner_id = comAdd.commissioner_id;
      dataMain.community_additions = comAdd.community_additions;

      (function() {
        var post = $http.post('rest.php/communities/addcomm', JSON.stringify(dataMain))
          .then(successHandler)
          .catch(errorHandler);
        function successHandler(result) {
          console.log('Реєстрація пройшла успішно!');
          //window.location.href = '/'; //community list

        }
        function errorHandler(result){
          console.log("Error:"+result);
        }
      })();
      
    }
  }

})();