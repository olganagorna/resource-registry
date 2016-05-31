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
            templateUrl: 'views/site/drdwndir.html',
            link: function(scope, el, attr){
                var $listContainer = angular.element( el[0].querySelectorAll('.search-item-list')[0] );
                el.find('input').bind('focus',function(){
                    $listContainer.addClass('drpdwn-show');
                });
                el.find('input').bind('blur',function(){
                    $timeout(function(){ $listContainer.removeClass('drpdwn-show') }, 200);
                });
                scope.chooseItem = function(item){
                    scope.search = item.name;
                    scope.searchResult =  item;
                    $listContainer.removeClass('drpdwn-show');
                }
            }
        };
    })
})();
