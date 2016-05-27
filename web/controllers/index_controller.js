(function(){
    'use strict';
    angular
        .module('restApp')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['RestService', '$route', '$routeParams', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function IndexCtrl(RestService, $route, $routeParams, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {
        $scope.obj = 1;
        $scope.xmlData = [];
        $scope.addAttr;

        ($scope.getData = function() {
            return $http.get('rest.php/resource_classes/attribute')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(result) {
                var temparrResClName = [];
                var temparr = [];
                for (var i = 0; i < result.data.items.length; i++) {
                    if (temparrResClName.indexOf(result.data.items[i].res_name) == -1) {
                        //if not exist - create new item object
                        var tObj = {};
                        tObj.main = result.data.items[i];
                        console.log(tObj.main);
                        tObj.attr = {};
                        if (result.data.items[i].attr_name != null) {
                           tObj.attr[result.data.items[i].attr_id] = result.data.items[i].attr_name;
                        }
                        temparrResClName.push(result.data.items[i].res_name);
                        temparr.push(tObj);
                    }
                    else {
                        if (result.data.items[i].attr_name != null) {
                            for (var j = 0; j< temparr.length; j++) {
                               if (temparr[j].main.res_name == result.data.items[i].res_name) {
                                    temparr[j].attr[result.data.items[i].attr_id] = result.data.items[i].attr_name;
                               }
                            }
                        }
                    }
                }
                $scope.xmlData = temparr;
                console.log($scope.xmlData);
            }
            function errorHandler(result){
                alert(result.data[0].message);
            }
        })();

        $scope.addAttribute = function(attribute, class_id) {
            $scope.attribute = {
                attribute_name: attribute,
                class_id: class_id,
            }
            console.log($scope.attribute);
            (function() {
                $http.post('rest.php/attribute_class_views/addattribute', JSON.stringify($scope.attribute))
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(attribute);
                    console.log('Додано новий атрибут!');
                    $scope.getData();
                }
                function errorHandler(result){
                    console.log("Error:"+result);
                }
            })();
        };

        $scope.del = function(attr_id){
            (function(){
                return $http.get('rest.php/attribute_class_views/deleteattribute?attr_id=' + attr_id)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                    console.log('Атрибут видалено!');
                    $scope.getData();
                }
                function errorHandler(result){
                    alert(result.data[0].message);
                    console.log(result.data[0].message);
                }
            }());
        };
        $scope.addClass = function(){
            console.log($scope.addClassInput);
            var classObj = {
                name: $scope.addClassInput
            };
            (function(){
                return $http.post('rest.php/resource_classes',classObj)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                    alert('Êëàñ óñï³øíî Äîäàíèé');
                    $route.reload();
                }
                function errorHandler(result){
                    alert(result.data[0].message);
                    console.log(result.data[0].message);
                }
            }());
        };

        // Pagination start
        // $scope.currentPage = PaginationService.currentPage;
        // $scope.getPages = function(pageCount) {
        //     return PaginationService.getPages(pageCount);
        // };

        // $scope.switchPage = function(index) {
        //     if($scope.request) {
        //         PaginationService.switchPage(index, constant.resource_classesQuery + '/search?' + buildQuery($scope.request)+ '&')
        //             .then(function(result) {
        //                 $scope.xmlData = result.data;
        //                 $scope.currentPage = PaginationService.currentPage;
        //         });
        //     }  else if ($scope.searchingDone) {
        //         PaginationService.switchPage(index, 'resource_classes?value=' + $scope.searchingDone + "&page=" + index + "&per-page=" + constant.perPage)
        //             .then(function(result) {
        //                 $scope.xmlData = result.data;
        //                 $scope.currentPage = PaginationService.currentPage;
        //         });
        //     } else {
        //         PaginationService.switchPage(index, constant.resource_classesQuery + '?')
        //             .then(function(result) {
        //                 $scope.xmlData = result.data;
        //                 $scope.currentPage = PaginationService.currentPage;
        //         });
        //     }
        // };
        // $scope.switchPage($scope.currentPage);
        // $scope.setPage = function(pageLink, pageType) {
        //     PaginationService.setPage(pageLink, pageType, $scope.xmlData._meta.pageCount)
        //         .then(function(data) {
        //             $scope.xmlData = data.data;
        //             $scope.currentPage = PaginationService.currentPage;
        //     });
        // };
        //Pagination end

        $scope.changeActivationStatus = function(activation_status, class_id) {
            $http.get('rest.php/resource_classes/changeactivationstatus?class_id='+ class_id + '&' + 'activation_status=' + activation_status)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler() {
                $scope.getData();
            }
            function errorHandler() {
                console.log("Can't change activation status!");
            }
        };
    }


})();