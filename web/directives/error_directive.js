(function () {

	  'use strict';

	  angular.module('restApp').directive('errorBox', function (AUTH_EVENTS) {
        return {
            restrict: 'E',
            template: '<div ng-if="visible" ng-include="\'views/site/errorbox.html\'">',
            link: function (scope) {
                var showDialog = function () {
                scope.visible = true;
                };
                var hideDialog = function () {
                scope.visible = false;
                };
                scope.visible = false;
                scope.$on(AUTH_EVENTS.routeChng, hideDialog);
                scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
            }
        };
    })
})();
