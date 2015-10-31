(function(){
    'use strict';

    angular
        .module('restApp')
        .controller('update', update);
        update.$inject = [
            '$scope',
            '$http',
            'RestService',
            'resourceId',
            '$route',
            '$location',
            'constant',
            '$rootScope',
            'CoordsService',
        ];

        function update($scope, $http, RestService, resourceId, $route, $location, constant, $rootScope, CoordsService) {
            //Coord start

            $scope.coordId = null;
            $scope.coord = {};
            $scope.lat = {};
            $scope.lng = {};

            $scope.isShowMap = false;
            $scope.showMap = function (){
                $scope.isShowMap = !$scope.isShowMap;
            };

            $scope.formatCoords = function(coords){
                return  CoordsService.formatCoords (coords);
            };

            $scope.createCoords = function(lat, lng){
                var lat = CoordsService.convertDMSToDD(lat.deg,lat.min, lat.sec).toFixed(4);
                var lng = CoordsService.convertDMSToDD(lng.deg,lng.min, lng.sec).toFixed(4);
                var coord = {lat: lat, lng: lng};
                if(!CoordsService.createCoords(coord, $rootScope.coords, $scope.coordId)){
                    $scope.coordId = null;
                }
                $scope.lat = {};
                $scope.lng = {};
                $scope.coord = {};
            };
            $scope.changeCoords = function(coord, coordId){
                var newCoords = CoordsService.changeCoords(coord, coordId);
                $scope.coord = newCoords.coord;
                var newLat = CoordsService.convertDDToDMS($scope.coord.lat);
                var newLng = CoordsService.convertDDToDMS($scope.coord.lng);
                $scope.lat = {deg: newLat.deg, min: newLat.min, sec: newLat.sec};
                $scope.lng = {deg: newLng.deg, min: newLng.min, sec: newLng.sec};
                $scope.coordId = newCoords.coordId;
            };

            $scope.deleteCoords = function(){
                CoordsService.deleteCoords($rootScope.coords, $scope.coordId);
                $scope.coordId = null;
                $scope.coord = {};
                $scope.lat = {};
                $scope.lng = {};
            };

            // select date start

            $scope.datePicker = {
                date:constant.DEFOULT_START_DATE
            };

            $scope.resource = {
                date:''
            };

            $scope.dateOptions = {
                startingDay: 1,
                showWeeks: false,
                formatYear: 'yy'
            };

            $scope.today = function() {
                $scope.datePicker.date = new Date();
            };
            $scope.today();

            $scope.minDate =  null;

            $scope.clear = function () {
                $scope.datePicker.date = null;
            };

            $scope.status = {
                opened: false
            };

            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.datePicker.date = new Date(year, month, day);
            };

            $scope.$watch("datePicker.date", function(time) {

                if (time < $scope.minDate) $scope.datePicker.date = constant.DEFOULT_MIN_DATE;

                $scope.resource.date = ( time instanceof Date)? toDateFormatUTC(time) : null;

            });

            function toDateFormatUTC(time) {
                var now = new Date(time);
                var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
                return todayUTC.toISOString().slice(constant.DAY_CHAR_START, constant.DAY_CHAR_END).replace(/-/g, '-');
            };


            //Get date creation end

            $scope.deleteResource = function(resourceID, ownerId) {

                if(confirm(constant.MSG_DELATE_RESOURCE) == true && resourceID >0){
                    RestService.deleteData(resourceID, constant.resourcesQuery)
                        .then(function(respond){
                        });
                    if (ownerId){
                        RestService.deleteData(ownerId , 'personal_datas');
                    }
                    $route.reload();
                    $location.path('resource/index');
                }
            };

            // select date end


            //Coord end

            RestService.getDataById(resourceId, constant.resourcesQuery).then(function(data){
                $scope.resource = data.data;

                $rootScope.coords = CoordsService.geotypeToCoords($scope.resource.coordinates);
                //Get resource date
                $scope.datePicker.date = new Date(data.data.date);

                RestService.getDataById($rootScope.currentUser.userDataID , constant.personal_datasQuery)
                    .then(function(data){
                        $scope.personal_data = data.data;
                        console.log($scope.personal_data);
                });

                RestService.getData(constant.resource_classesQuery + '/search?name=' + $scope.resource.class)
                    .then(function(data){
                        console.log(data.data);
                        var classObj = data.data;
                        $scope.classId = classObj[0].class_id;
                    });


                //Get resource parameters
                RestService.getData(constant.parametersQuery + '/search?resource_id=' + $scope.resource.resource_id)
                    .then(function(data){
                        var params = data.data;
                        $scope.params = {};
                        var i;
                        for (i in params){
                            $scope.params[params[i].attribute_id-1] = params[i];
                        }

                    });

                //Get resource owner
                if($scope.resource.owner){
                    RestService.getData(constant.personal_datasQuery + '/search?personal_data_id=' + $scope.resource.owner.personal_data_id)
                        .then(function(data){
                            $scope.owner = data.data[0];
                        });
                }
            });
            $scope.newParams = {};
            $scope.addNewParams = function(){

            };
            $scope.updateResource= function(resource, personal_data , params, classId) {

                resource.coordinates = CoordsService.coordsToGeotype($rootScope.coords);
                resource.class_id = classId;
                resource.date = toDateFormatUTC($scope.datePicker.date);

                var j;
                for (j in $scope.newParams) {
                        $scope.newParams[j].resource_id = resourceId;
                        $scope.newParams[j].attribute_id = parseInt(j)+1;
                        RestService.createData($scope.newParams[j], constant.parametersQuery);
                }

                var i;
                for (i in params) {
                    console.log(' '+ params[i] + params[i].parameter_id + constant.parametersQuery);
                    RestService.updateData(params[i], params[i].parameter_id, constant.parametersQuery);
                }


                RestService.updateData(personal_data , personal_data.personal_data_id, constant.personal_datasQuery);


                RestService.updateData(resource, resourceId, 'resources');

                $location.path('resource/index');
                $route.reload();

            };

        }

})();