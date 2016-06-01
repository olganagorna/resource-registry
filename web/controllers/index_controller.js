(function(){
    'use strict';
    angular
        .module('restApp')
        .controller('IndexCtrl', IndexCtrl);

    IndexCtrl.$inject = ['RestService', '$route', '$routeParams', '$location', 'constant', '$filter' , '$rootScope', '$scope', '$http', 'PaginationService'];
    function IndexCtrl(RestService, $route, $routeParams, $location, constant, $filter , $rootScope, $scope, $http, PaginationService) {
        $scope.obj = 1;
        $scope.xmlData = [];
        $rootScope.localAttributes = [];
        $scope.addAttr;
        $scope.globalAttributes = [];
        $scope.searchVal = "";
        $scope.orderBy = "ASC";

        ($scope.getData = function() {
            return $http.get('rest.php/attribute_class_views/findfilteredattributes')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.xmlData = data.data;
                console.log($scope.xmlData);
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
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

        $scope.deleteAttribute = function(attr_id){
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

        $scope.changeActivationStatus = function(activation_status, class_id) {
            if (confirm("Ви справді бажаєте змінити статус активації для даного типу ресурів?") == true) {
                $http.get('rest.php/resource_classes/changeactivationstatus?class_id='+ class_id + '&' + 'activation_status=' + activation_status)
                    .then(successHandler)
                    .catch(errorHandler);
            }
            function successHandler() {
                $scope.getData();
            }
            function errorHandler() {
                console.log("Can't change activation status!");
            }
        };

        function alertPopup(argument) {
            if(argument==200) {
                alert($scope.resource_class.res_class_name + " додано!");    
            } else if(argument==400) {
                alert('Тип ресурсу з такою назвою вже існує.');    
            } else {
                alert('Неможливо додати новий тип ресурсу!');
            }   
        }

        ($scope.getGlobalattributes = function() {
            return $http.get('rest.php/resource_attributes/findglobalattributes')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.globalAttributes = data.data;
                console.log($scope.globalAttributes);
            }
            function errorHandler(data) {
                console.log("Can't reload list!");
            }
        })();


        ($rootScope.getLocalAttributes = function(class_id) {
            return $http.get('rest.php/attribute_class_views/findfilteredattributesforeachresourceclass?class_id=' + class_id)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $rootScope.localAttributes = data.data;
                console.log($scope.localAttributes);
                
            }
            function errorHandler(data) {
                // console.log("Can't reload list!");
            }
        })();

        $scope.addResourceClass = function(name) {
            $scope.resource_class = {
                res_class_name: name
            }                   
            if (confirm("Ви справді бажаєте додати тип ресурсів - " + $scope.resource_class.res_class_name + " ?") == true) {
                $http.post('rest.php/resource_classes/addresourceclass', JSON.stringify($scope.resource_class))
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(status) {
                    alertPopup(status.status);
                    $scope.addResClass = "";
                    $scope.getData();
                }
                function errorHandler(status) {
                    alertPopup(status.status);
                }
            }

        };

        $scope.createMember = function(member) {
            var membersService = new Members(member);
            membersService.$create(function(member) {
                $scope.members.push(member);
                $scope.member = '';
            });
        };

        $scope.searchResClass = function(name) {
            if ($scope.resClassSearch) {
                $scope.searchVal = $scope.resClassSearch;
            } else {
                $scope.searchVal = "";
            }


            $http.get('rest.php/resource_classes/getresourceclass?search='+ $scope.searchVal + "&order=" + $scope.orderBy)
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.xmlData = data.data;
            }
            function errorHandler(data){
                console.log("Can't reload list!");
            }
        };

    }

})();