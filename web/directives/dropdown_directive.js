(function () {

    'use strict';

    angular.module('restApp').directive('dropdownList', function ($timeout) {
        return {
            restrict: 'E',
            scope: {
                itemsList: '=',
                searchResult: '=',
                placeholder: '@',
            },
            template: '<input class="form-control" type="text" ng-model="search" placeholder="{{ placeholder }}" />' +
                '<div class="search-item-list"><ul class="list-group material-list-group list">' +
                    '<li class="list-group-item" ng-repeat="item in itemsList | toArray : false | filter:{isactive:1} | filter:search" ng-click="chooseItem( item )">{{ item.name }}' +
                        '<span class="badge">{{ item.prefix }}</span>' +
                    '</li>' +
                '</ul></div>',

            link: function(scope, el, attr){
                var $listContainer = angular.element( el[0].querySelectorAll('.search-item-list')[0] );
                el.find('input').bind('focus',function(){
                    $listContainer.addClass('show');
                });
                el.find('input').bind('blur',function(){
                    $timeout(function(){ $listContainer.removeClass('show') }, 200);
                });
                scope.chooseItem = function( item ){
                    scope.search = item.name;
                    scope.searchResult =  item;
                    $listContainer.removeClass('show');
                }
            }
        };
    })
})();
