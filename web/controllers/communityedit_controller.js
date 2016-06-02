(function () {
    'use strict';
    angular
        .module('restApp')
        .controller('CommEditCtrl', CommEditCtrl);
    
    CommEditCtrl.$inject = ['$location', '$http', '$routeParams'];
    function CommEditCtrl($location, $http, $routeParams) {
        var commEdit = this;
        commEdit.community = {};
        commEdit.community.communId = $routeParams.communityId;
        commEdit.community.name = 'error';

        (function(){
            var get = $http.get('rest.php/communities/'+commEdit.community.communId)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                commEdit.community.name = result.data.name;
                commEdit.community.prefix = result.data.prefix;
                commEdit.community.notes = result.data.notes;
                commEdit.community.isactive = result.data.isactive;
            }
            function errorHandler(result){
                // handler
            }
        }());

        commEdit.updateComm = function () {
            var post = $http.put('rest.php/communities/'+commEdit.community.communId, commEdit.community)
            .then(successHandler)
            .catch(errorHandler);

            function successHandler(result) {
                $location.path('/resource/community');;
            }
            function errorHandler(result){
                // handler
            }
        }
    }
})();