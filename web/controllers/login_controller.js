(function () {
    'use strict';

    angular
        .module('restApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', '$http', '$rootScope', 'AuthService'];
    function LoginController($location, $scope, $http, $rootScope, AuthService) {

        $rootScope.logout = function (){

            $http.get('rest.php/users/logout')
                .then(function(response){
                    AuthService.logOut();
                });
        };

        var vm = this;

        if($location.search().p){
            vm.resetForm = true;
        } else {
            vm.resetForm = false;
        }

        vm.user = {
            username: '',
            password: '',
            rememberMe: 1,
        };

        vm.logIn = function(){

            vm.user.username = vm.username;
            vm.user.password = vm.password;

            vm.send = function () {
                return $http.post('rest.php/users/login', vm.user)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    sessionStorage.setItem('user',angular.toJson(result.data));
                    $rootScope.currentUser = angular.fromJson(sessionStorage.getItem('user'));
                    if (result.data.role == 'admin') {
                        $location.path('/site/users');
                    } else {
                        $location.path('/resource/index');
                    }

                }
                function errorHandler(result){
                    alert(result.data[0].message);
                }
            };
            vm.send();
        };

        vm.restorePassword = function(){
            console.log('restore');
            vm.json = {
                username: vm.username
            };
            return $http.post('rest.php/users/restorepass', vm.json)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                alert('Повідомлення успішно відправлено на вашу електронну скриньку! Слідуйте інструкціям');
                $location.path('/site/login');
            }
            function errorHandler(result){
                alert("Виникли проблеми при спробі обробки запиту, обновіть сторінку та спробуйте ще раз");
                console.log(result.data.message);
            }

        };
        vm.sendNewPassword = function(){
            console.log('send_new_password');
            vm.json = {
                username: $location.search().u,
                token: $location.search().p,
                password: vm.password
            };
            console.log(vm.json);
            return $http.post('rest.php/users/changepass', vm.json)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                console.log(result);
                alert('Пароль успішно змінено');
                $location.path('/site/login');
            }
            function errorHandler(result){
                alert("Виникли проблеми при спробі обробки запиту, обновіть сторінку та спробуйте ще раз");
                console.log(result.data.message);
            }

        };
    }

})();