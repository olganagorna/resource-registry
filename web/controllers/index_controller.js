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
            return $http.get('rest.php/attribute_class_views/findfilteredattributes')
                .then(successHandler)
                .catch(errorHandler);
            function successHandler(data) {
                $scope.xmlData = data.data;
            }
            function errorHandler(data) {
                //Here will be errorhandler
            }
        })();

        $scope.addAttribute = function(attribute, class_id) {
            $scope.attribute = {
                name: attribute,
                class_id: class_id,
            };
            
            (function() {
                $http.post('rest.php/attribute_class_views/addattribute', JSON.stringify($scope.attribute))
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    $scope.getData();
                }
                function errorHandler(result){
                    if(result.data.message.includes('error42')){
                        alert('Такий атрибут існує');
                    }
                }
            })();
        };

        $scope.deleteAttribute = function(attr_id, class_id){
            (function(){
                return $http.get('rest.php/attribute_class_views/deleteattribute?attr_id=' + attr_id + '&class_id=' + class_id)
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    $scope.getData();
                }
                function errorHandler(result){
                    //Here will be errorhandler
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
                //Here will be errorhandler
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

        $scope.addResourceClass = function(name) {
            $scope.resource_class = {
                res_class_name: name
            };                   
            if (confirm("Ви справді бажаєте додати тип ресурсів - " + $scope.resource_class.res_class_name + " ?") == true) {
                $http.post('rest.php/resource_classes/addresourceclass', JSON.stringify($scope.resource_class))
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(status) {
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
    }

})();