(function () {
    'use strict';

    angular
        .module('restApp')
        .controller('communityAddCtrl', commAddController);

    commAddController.$inject = ['$location', '$rootScope', '$scope', '$http'];
    function commAddController($location, $rootScope, $scope, $http) {
        var vm = this;


        vm.community = {
            community_name: '',
            community_num: '',
            community_commissioner: '',
            community_additions: ''
        };

        vm.community_registration = function(){
            console.log('test');

            vm.community.community_name = vm.community_name;
            vm.community.community_pass = vm.community_pass;
            vm.community.community_commissioner = vm.community_commissioner;
            vm.community.community_additions = vm.community_additions;

            vm.send = function () {
                return $http.post('rest.php/communities/addcommunity', vm.community)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                   // localStorage.setItem('community_name',vm.community_name);
                    alert('Реєстрація пройшла успішно!');
                   $location.path('/resource/index');

                }
                function errorHandler(result){
                    alert(result.data.message);
                    console.log(result);
                }
            };
            vm.send();
        };



    }

})();

