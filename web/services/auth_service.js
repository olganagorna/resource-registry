(function () {
    'use strict';

    angular
        .module('restApp')
        .factory('AuthInterceptor', AuthInterceptor)
        .factory('AuthService', AuthService);

    AuthInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS'];
    function AuthInterceptor($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) { 
              $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
              }[response.status], response);
              return $q.reject(response);
            }
        };
    }

    AuthService.$inject = ['$rootScope'];
    function AuthService($rootScope) {

        var authService = {};

        authService.init = function () {
            if (!sessionStorage.getItem('user')) {
                var user = {
                    "username":"",
                    "role":"guest",
                    "isLogined":false,
                    "userDataID":0
                };
                sessionStorage.setItem('user',angular.toJson(user));

            }
            $rootScope.currentUser = angular.fromJson(sessionStorage.getItem('user'));
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return authorizedRoles.indexOf($rootScope.currentUser.role) !== -1;
        };
        return authService;
    }

})();