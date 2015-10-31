(function(){
    'use strict';
    
    angular
        .module('restApp')
        .controller('index', index);
        index.$inject = ['$scope',
                        '$http',
                        'RestService',
                        '$rootScope',
                        '$location',
                        '$route',
                        'PaginationService',
                        'constant',
                        'CoordsService'
        ];

        function index($scope, $http, RestService, $rootScope, $location, $route, PaginationService, constant, CoordsService) {

            $rootScope.currentUser = angular.fromJson(sessionStorage.getItem('user'));

            //Dialog start

            //Dialog end

            //Coord start
            $rootScope.coords = [];

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

            $scope.params = [];

            $rootScope.$watch('coords', function(coords) {
               // console.log(coords);

                if (Object.keys(coords).length!==0) {
                    $scope.params[3].value = getArea(coords).toFixed(4);
                    $scope.params[6].value = getPerimeter(coords).toFixed(4);
                }

            });

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

            //Coord end

            //Load resources per page
            RestService.getData(constant.resourcesQuery + '?&per-page=' + constant.perPage)
                .then(function(data){
                    $scope.resources = data.data;
                });


            // console.log($rootScope.currentUser);
            // console.log($rootScope.isLogined);


            //MAIN HASH REQUEST FOR RESOURCE


            $scope.resource = {
                reason:{
                    passport:{
                        department:'',
                        date:'',
                    },
                    text:'',
                },
                registrar_data_id: null,
                date:'',
            };

            $scope.owner = {
                passport_series:'',
                passport_number:'',
                first_name:'',
                last_name:'',
                middle_name:'',
                address:''
            };

            //Get date creation start

            $scope.datePicker = {
                date:constant.DEFOULT_START_DATE
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
            /*
            //Get date creation end
           $scope.resource.registration_number;
            //START Get personal date
           $scope.$watch("resource.registration_number", function(num) {
                $scope.resource.registration_number = num ;
           });

*/
            if ($rootScope.currentUser !== null) {
                RestService.getDataById($rootScope.currentUser.userDataID , constant.personal_datasQuery)
                    .then(function(data){
                        $scope.personal_data = data.data;
                        $scope.resource.registrar_data_id = data.data.personal_data_id;
                       // console.log($scope.personal_data);

                    })
                    /*
                    .then(function(){
                        $scope.registration_number = getRegistrationNumber($scope.personal_data.personal_data_id, $scope.personal_data.registrar_key) ;
                        $scope.$apply();
                    })
                    */
            };

            //END Get personal date

            $scope.reason = {
                passport:{
                    date:new Date()
                }
            };

            $scope.reason_date = {
                date:''
            };

            $scope.reasonPassportDateStatus = {
                opened: false
            };

            $scope.openReasonPassportDate = function($event) {
                $scope.reasonPassportDateStatus.opened = true;
            };

            $scope.today = function() {
                $scope.reason.passport.date = new Date();
            };

            $scope.reasonPassportMinDate = null;

            $scope.clear = function () {
                $scope.reason.passport.date = null;
            };

            $scope.$watch("reason.passport.date", function(time) {
                            $scope.reason_date.date = ( time instanceof Date)? toDateFormatUTC(time) : '';
                        });

            $scope.$watchGroup(constant.reasonWatchGroupHash, function(scope) {

                             $scope.reason.text = constant.MSG_REASON_DOC_PSW +
                         ' '+$scope.owner.passport_series+
                         ' '+$scope.owner.passport_number+
                         ' ,'+constant.MSG_REASON_DOC_DEPARTMENT+
                         ' '+$scope.owner.last_name +
                         ' '+$scope.owner.middle_name +
                         ' '+$scope.reason.passport.department +
                         ' '+$scope.reason_date.date;

            });



            $scope.$watch("reason.text", function(text) {
                $scope.resource.reason = text;
            });


            function toDateFormatUTC(time) {
                var now = new Date(time);
                var todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
                return todayUTC.toISOString().slice(constant.DAY_CHAR_START, constant.DAY_CHAR_END).replace(/-/g, '-');
            };


            //END Get personal date


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



             function getRegistrationNumber(id, regitration_key){
             //   console.log(regitration_key);
                var key;
                RestService.getData(constant.resourcesQuery + '/getregisterkey?registrar_data_id=' + id)
                    .then(function(data){
                        if (data.data.items.length) {
                            key = data.data.items[0].registration_number;

                     //       console.log(nextRegistrationKey(key));
                    //        alert(nextRegistrationKey(key));
                        } else {
                            key = regitration_key;
                       //     console.log(key,2);
                       //     console.log(nextRegistrationKey(key));
                        //    alert(nextRegistrationKey(key));
                        }

                        function nextRegistrationKey(key) {
                            var parts = key.split(':');
                            parts[parts.length - 1] = ('000' + (Number(parts[parts.length - 1]) + 1)).slice(-4);
                            return parts.join(':');
                        }
                    });

                return key;
            };



            $scope.createResource = function(resource, owner, params) {

                if ($rootScope.coords.length)
                    resource.coordinates = CoordsService.coordsToGeotype($rootScope.coords);
                else
                    resource.coordinates = [];
                var createParameters = function(params, resourceId){
                    var i;
                    for (i in params) {
                        if(params[i]){
                            params[i].resource_id = resourceId;
                            params[i].attribute_id = parseInt(i)+1;

                            RestService.createData(params[i], constant.parametersQuery)
                        }
                    }
                };

                if(!owner || Object.keys(owner).length < constant.paramsNumber || !isDataForObject(owner)){

                    RestService.createData(resource, constant.resourcesQuery)
                        .then(function(response){
                            createParameters(params, response.data.resource_id);
                        })
                        .then(function(response){
                            $location.path('resource/index');
                        });

                }else{
                    RestService.createData(owner, constant.personal_datasQuery)
                        .then(function (response) {
                            resource.owner_data_id = response.data.personal_data_id;
                            return RestService.createData(resource, constant.resourcesQuery);
                        })
                        .then(function(response){
                            createParameters(params, response.data.resource_id);
                        })
                        .then(function(response){
                            $location.path('resource/index');
                        });
                }

            };

            function isDataForObject (Obj){
                for (var key in Obj){
                    return (Obj[key].length===0)?false:true;
                }
            };

            function getArea(zones) {
                var currzonecoords = [];

                for(var k=0;k<zones.length;k++) {
                    var currentcoord=new google.maps.LatLng(zones[k]['lat'],zones[k]['lng']);
                    currzonecoords.push(currentcoord);
                }
                var zonearea = google.maps.geometry.spherical.computeArea(currzonecoords);
                //alert('area: ' + zonearea);
                return zonearea;
            }
            function getPerimeter(zones) {
                var perimeter = 0;

                for(var k=0;k<zones.length-1;k++) {
                    var p1 = new google.maps.LatLng(zones[k]['lat'],zones[k]['lng']),
                        p2 = new google.maps.LatLng(zones[k+1]['lat'],zones[k+1]['lng']);

                    perimeter += google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
                }
                var p1 = new google.maps.LatLng(zones[0]['lat'],zones[0]['lng']),
                    p2 = new google.maps.LatLng(zones[zones.length-1]['lat'],zones[zones.length-1]['lng']);

                perimeter += google.maps.geometry.spherical.computeDistanceBetween(p1, p2);

                //alert('perimeter: ' + perimeter);
                return perimeter;
            }

        }

})();
