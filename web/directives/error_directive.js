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
  
      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthorized, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
})


})();
