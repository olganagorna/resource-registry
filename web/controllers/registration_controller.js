(function () {
    'use strict';

    angular
        .module('restApp')
        .controller('RegistrationCtrl', RegisterController);

    RegisterController.$inject = ['$rootScope', '$http'];
    function RegisterController($rootScope, $http) {
        var vm = this;
        vm.setForm = function () {
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
                activation_status: '1'
            };
        }
        vm.setForm();
        if ($rootScope.currentUser.role === 'commissioner') {
            vm.user.community_id = $rootScope.currentUser.communityId;
        } else {
            vm.community = {community_id: 0};
            $http.get('rest.php/communities')
                .then(successHandler);
            function successHandler(data) {
                vm.itemsList = data.data.items;
            }
        }
        
        vm.registration = function(){
            if ($rootScope.currentUser.role !== 'commissioner') {
                vm.user.community_id = vm.community.community_id;
            }
            $http.post('rest.php/users/adduser', vm.user)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                alert('Реєстрація пройшла успішно!');
                vm.setForm();
            }
            function errorHandler(result){
                alert(result.data.message);
            }
        };
    }
})();

