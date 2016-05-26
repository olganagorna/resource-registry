    (function(){

    'use strict';

    angular
        .module('restApp', ['ngRoute', 'restApp.map', 'ngCookies', 'calendar', 'datePicker', 'ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$locationProvider', '$routeProvider', '$httpProvider'];

    function config($locationProvider, $routeProvider, $httpProvider) {

    $routeProvider
        .when('/site/logs', {
            templateUrl: 'views/site/logs.html',
            data: {
                authRoles: 'registrar'
            }
        })
        .when('/resource/index', {
            templateUrl: 'views/resource/resource.html',
            controller: 'index',
            data: {
                authRoles: ['user', 'registrar', 'commissioner']
            }
        })
        .when('/resource/create', {
            templateUrl: 'views/resource/create_resource.html',
            controller: 'index',
            data: {
                authRoles: ['user', 'registrar', 'commissioner']
            }
        })
        .when('/resource/update/:resourceId', {
            templateUrl: 'views/resource/update_resource.html',
            controller: 'update',
            resolve: {
                resourceId: function($route){
                    return $route.current.params.resourceId;
                }
            },
            data: {
                authRoles: ['user', 'registrar', 'commissioner']
            }
        })
        .when('/resource/search', {
            templateUrl: 'views/resource/search_resource.html',
            controller: 'ExtendedSearchController',
            data: {
                authRoles: ['admin']
            }
        })
        .when('/resource/delete/:resourceId', {
            templateUrl: 'views/resource/resource.html',
            data: {
                authRoles: ['user', 'registrar', 'commissioner']
            }
        })
        .when('/site/login', {
            controller: 'LoginController',
            templateUrl: 'views/site/login.html',
            controllerAs: 'vm',
            data: {
                authRoles: 'guest'
            }
        })
        .when('/site/registration', {
            controller: 'RegistrationCtrl',
            templateUrl: 'views/site/registration.html',
            controllerAs: 'vm',
            data: {
                authRoles: ['admin', 'commissioner']
            }
        })
	    .when('/resource/type', {
            templateUrl: 'views/resource/resource_types.html',
            data: {
                authRoles: 'admin'
            }
        })
        .when('/site/users', {
            controller: 'UsersController',
            controllerAs: 'list',
            templateUrl: 'views/site/users.html',
            data: {
                authRoles: 'admin'
            }
        })
        .when('/site/restorepassword', {
            controller: 'LoginController',
            templateUrl: 'views/site/restorepassword.html',
            controllerAs: 'vm',
            data: {
                authRoles: 'guest'
            }
        })
        .when('/resource/community', {
            controller: 'UsersCommunity',
            templateUrl: 'views/site/community.html',
            controllerAs: 'usersCtrl',
            data: {
                authRoles: 'admin'
            }
        })
        .when('/community/update/:communityId', {
            controller: 'CommEditCtrl',
            templateUrl: 'views/site/community_edit.html',
            controllerAs: 'commEdit',
            data: {
                authRoles: 'admin'
            }
        })
        .when('/community/communityadd', {
            controller: 'communityAddCtrl',
            templateUrl: 'views/site/community_add.html',
            controllerAs: 'comAdd',
            data: {
                authRoles: 'admin'
            }
        })
        .when('/site/requests', {
            controller: 'RequestsController',
            templateUrl: 'views/site/requests.html',
            data: {
                authRoles: ['user', 'registrar', 'commissioner']
            }
        })
        .otherwise({
            redirectTo: '/site/login',
            data: {
                authRoles: 'guest'
            }
        });
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }

    run.$inject = ['$rootScope', '$location', 'AuthService'];
    function run($rootScope, $location, AuthService) {

        AuthService.init();

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            var authRoles = next.data.authRoles;
            if (!AuthService.isAuthorized(authRoles)) {
                //event.preventDefault();
                console.log('unauthorized!');
            }
        });
    }
})();
