(function () {
    'use strict';
    angular
        .module('restApp')
        .controller('UserEditCtrl', UserEditCtrl);
    
    UserEditCtrl.$inject = ['$location', '$http', '$routeParams'];
    function UserEditCtrl($location, $http, $routeParams) {
        var userEdit = this;
        userEdit.user = {};
        userEdit.user.userId = $routeParams.user_id;
        userEdit.user.username = 'error';

        (function(){
            var get = $http.get('rest.php/users/' + userEdit.user.userId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                userEdit.user.username = result.data.username;
                userEdit.user.last_name = result.data.last_name;
                userEdit.user.first_name = result.data.first_name;
                userEdit.user.role_name = result.data.role_name;
                userEdit.user.community_name = result.data.community_name;
            }
            function errorHandler(result){
                // handler
            }
        }());

        userEdit.updateUser = function () {
            var post = $http.put('rest.php/users/' + userEdit.user.userId, userEdit.user)
            .then(successHandler)
            .catch(errorHandler);

            function successHandler(result) {
                $location.path('/site/users');
            }
            function errorHandler(result){
                // handler
            }
        }
    }
})();