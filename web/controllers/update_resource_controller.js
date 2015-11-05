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

            function modifyProperty(ObjSource){
                var Obj = {};
                 if(Object.keys(ObjSource).length>0){
                        angular.copy(ObjSource, Obj);
                        for (var key in Obj){
                            if (key==='owner'||key==='parameters')delete Obj[key];
                        }
                        return Obj;
                    }
            };

            //Get date creation end

            $scope.deleteResource = function(resourceID, ownerId) {

                if(confirm(constant.MSG_DELATE_RESOURCE) == true && resourceID >0){
                    RestService.deleteData(resourceID, constant.resourcesQuery)
                            $route.reload();
                            $location.path('resource/index');
                }
            };
            // for backup data or/and check difference
            var oldResourceData = {},
                oldOwnerData = {},
                oldRegistrarData = {};
            // important condition create or update resource
            $scope.wnerId = false;

            RestService.getDataById(resourceId, constant.resourcesQuery)

                .then(function(data){

                    $scope.resource = data.data;
                    // IMPORTANT ==null, check in null or undefined
                    $scope.owner_search = ($scope.resource.owner == null) ? true : false;
                    console.log($scope.owner_search, 'ownerData', $scope.resource.owner);
                    angular.copy($scope.resource, oldResourceData);

                    $rootScope.coords = CoordsService.geotypeToCoords($scope.resource.coordinates);
                    //Get resource date
                    $scope.datePicker.date = new Date(data.data.date);

                    RestService.getDataById($rootScope.currentUser.userDataID , constant.personal_datasQuery)
                        .then(function(data){
                            $scope.personal_data = data.data;
                            angular.copy($scope.personal_data, oldRegistrarData);
                    });

                    RestService.getData(constant.resource_classesQuery)
                        .then(function(data){
                            $scope.resource_classes = data.data;
                            $scope.resource.class_id = '';
                        })
                        .then(function(){
                            RestService.getData(constant.resource_classesQuery + '/search?name=' + $scope.resource.class)
                                .then(function(data){
                                    var classObj = data.data;
                                    $scope.resource.class_id = classObj[0].class_id;
                                });
                        }
                    );

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
                                $scope.resource.owner = data.data[0];
                                angular.copy($scope.resource.owner, oldOwnerData);
                                $scope.ownerId = true;
                            });
                    }else{
                            $scope.resource.owner=null;
                            $scope.ownerId = false;
                    }
            });

            $scope.deleteOwnerId =  function(){

                if ($scope.resource.owner != null){

                    if(confirm(constant.MSG_DELETE_RESOURCE_OWNER) == true) {
                        var resourceOwnerId = {};
                            resourceOwnerId.owner_data_id = $scope.resource.owner_data_id = null;
                            RestService.updateData( resourceOwnerId.owner_data_id, resourceId, constant.resourcesQuery)
                                .then(function () {
                                    $scope.resource.owner = null;
                                    $scope.owner_search = true;
                                    $scope.resource.reason = '';
                                    $scope.ownerId = false;
                                });
                    }
                    console.log('deleteResourceOwner IS DATA RESOURCE', resourceId );
                    //console.log(resource.owner_data_id, resourceId, constant.resourcesQuery, 'deleteResourceOwner' );
                }else{
                    $scope.owner_search = true;
                }
            };

            $scope.searchOwnerId = function(dataSearch){
                console.log('SEARCH OWNER');
                //  http://web/rest.php/personal_datas/search?personal_data_id=41&first_name=value
                if(dataSearch!=null&&Object.keys(dataSearch).length>=constant.DEFAULT_MIN_SEARCH_OWNER_DATA){

                    RestService.getData(constant.personal_datasQuery + '/search?'+buildQuery(dataSearch))
                        .then(function (result) {
                            $scope.show_search_result=true;
                            $scope.owner_data = result.data;
                        })
                }else{
                    alert(constant.MSG_SEARCH_OWNER_MIN_REQ +' : '+ constant.DEFAULT_MIN_SEARCH_OWNER_DATA);
                }

            };

            $scope.cancelSearch = function(){
                    console.log('cancelSearch');
                    $scope.resource.owner = {};
                    //angular.copy(oldOwnerData, $scope.resource.owner);
                    $scope.show_search_result=false;
            };

            $scope.confirmOwner = function(data){
                console.log('ConfirmOwner');

                if(confirm(constant.MSG_LOAD_USER)){
                    angular.copy(data,$scope.resource.owner);
                    $scope.owner_search =false;
                    $scope.show_search_result=false;
                    $scope.ownerId = true;
                }

            };



            //Get resource parameters

            $scope.updateResource= function(resource, personal_data, params) {

                // important for create new parameters
                $scope.newParams = {};

                resource.coordinates = (CoordsService.coordsToGeotype($rootScope.coords)||null);
                resource.date = (angular.isDate($scope.datePicker.date))?toDateFormatUTC($scope.datePicker.date):null;
                resource.owner_data_id = (resource.owner!==null)? resource.owner.personal_data_id:null;

                for (var j in $scope.newParams) {
                            $scope.newParams[j].resource_id = resourceId;
                            $scope.newParams[j].attribute_id = parseInt(j)+1;
                            RestService.createData($scope.newParams[j], constant.parametersQuery);
                    }
                for (var i in params) {
                            RestService.updateData(params[i], params[i].parameter_id, constant.parametersQuery);
                };

               // resource.owner_data_id != null    !!!important not === we check is null and undefined

                if (resource.owner_data_id == null && resource.owner != null && Object.keys(resource.owner).length>=constant.ownerDataFields) {
                    console.log('NEW OWNER  RESOURCE', resource.owner);

                    RestService.createData(resource.owner, constant.personal_datasQuery)
                        .then(function (response) {
                            resource.owner_data_id = response.data.personal_data_id;
                            RestService.updateData(resource.owner_data_id, resourceId, constant.resourcesQuery);
                        })
                        .then(function () {
                            updateResource(resource, oldResourceData);
                        })

                } else if (resource.owner_data_id != null && $scope.ownerId === true ) {

                    console.log('UPDATE OWNER RESOURCE',  resource.owner_data_id);

                     if (!angular.equals(oldOwnerData, resource.owner)) {

                         var ownerDataRequest = requestToChangeData(resource.owner, oldOwnerData);
                             if (!! ownerDataRequest ) {
                                 RestService.updateData(ownerDataRequest, resource.owner.personal_data_id, constant.personal_datasQuery)
                                     .then(function () {
                                         updateResource(resource, oldResourceData);
                                     })
                             } else {
                                 alert(constant.MSG_REQUEST_UPDATE_OWNER_DATA_ERROR);
                             }
                         }

                } else if ($scope.ownerId !== true ) {
                    console.log('DELETE OWNER FROM RESOURCE',  resource.owner_data_id, resource.owner_data_id);

                         updateResource(resource, oldResourceData);

                };

                $location.path('resource/index');
                $route.reload();

            };

            function updateResource(newResource, oldResourceData){
                var resourceData = modifyProperty(newResource);
                if (!!resourceData) {
                    if (!angular.equals(modifyProperty(oldResourceData), resourceData)) {
                        RestService.updateData(resourceData, resourceId, constant.resourcesQuery);
                    }
                }
            };

            function requestToChangeData(newObj, oldObj){

                if (Object.keys(newObj).length>0) {
                    var newDataRequest = {};
                    for (var key in oldObj) {
                        if (oldObj[key] != newObj[key]) newDataRequest[key] = newObj[key];
                    }
                }
                return newDataRequest || false;
            };

            function buildQuery(res) {
                var requestData = res,
                    str = '';
                for (var key in requestData){
                    str += key + '=' + requestData[key] + '&';
                }
                return str.slice(0, - 1);
            };

        }

})();


/*
 //registrar data !!!
 if (!angular.equals(oldRegistrarData, $scope.personal_data)) {
 RestService.updateData(personal_data, personal_data.personal_data_id, constant.personal_datasQuery);
 };
 */
