(function () {
  'use strict';

  angular
    .module('restApp')
    .controller('communityAddCtrl', communityAddCtrl);

  communityAddCtrl.$inject = ['$scope', '$http', '$routeParams'];
  function communityAddCtrl($scope, $http, $routeParams) {
    var  comAdd = this;

    comAdd.getUserFromDb = function() {
      var data = {
      username: comAdd.username,
      };
      var post = $http.post('rest.php/users/getuser', JSON.stringify(data))
        .then(successHandler)
        .catch(errorHandler);
      function successHandler(result) {
        console.log(result.data.username);
        console.log(result);
        comAdd.findUser = 'юзер "'+result.data.username+'" існує';
        comAdd.commissioner_id = result.data.id;
      }
      function errorHandler(result){
        console.log("Error"+result);
        comAdd.findUser = 'юзер "'+comAdd.username+'" відсутній у базі';
      }
    };

    comAdd.addCommunity = function(){
      var dataMain = {
        community_name: "",
        community_num: "",
        commissioner_id: "",
        community_additions: ""
      }

      dataMain.community_name = comAdd.community_name;
      dataMain.community.community_num = comAdd.community_num;
      dataMain.community.commissioner_id = comAdd.commissioner_id;
      dataMain.community.community_additions = comAdd.community_additions;

      comAdd.send = function () {
        var post2 = $http.post('rest.php/communities/addcomm', dataMain)
          .then(successHandler)
          .catch(errorHandler);
        function successHandler(result) {
          console.log(result);
          // localStorage.setItem('username',comAdd.username);
          alert('Реєстрація пройшла успішно!');
          $location.path('/resource/community');

        }
        function errorHandler(result){
          alert(result.data.message);
          console.log(result);
        }
      };
      comAdd.send();
    }
  }

})();