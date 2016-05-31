(function () {
    'use strict';

    angular
        .module('restApp')
        .controller('RegistrationCtrl', RegisterController);

    RegisterController.$inject = ['$location', '$rootScope', '$scope', '$http'];
    function RegisterController($location, $rootScope, $scope, $http) {
        var vm = this;

        vm.user = {
            username: '',
            password: '',
            email: '',
            last_name: '',
            first_name: '',
            middle_name: '',
            passport_series: '',
            passport_number: '',
            address: '',
            role_id: '1',
            activation_status: '1',
            community: ''
        };

        vm.community = {community_id: 0};

        (function(){
            return $http.get('rest.php/communities')

                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                vm.itemsList = data.data.items;
            }
            function errorHandler(data){
                console.log("Can't render list!");
            }
        }());

        vm.registration = function(){

            vm.user.community = vm.community.community_id;

            vm.send = function () {
                return $http.post('rest.php/users/adduser', vm.user)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                   // localStorage.setItem('username',vm.username);
                    alert('Реєстрація пройшла успішно!');
                   //$location.path('/site/login');

                }
                function errorHandler(result){
                    alert(result.data.message);
                    console.log(result);
                }
            };
            //vm.send();
            console.log(vm.user);
        };
    }
})();

