(function(){

    'use strict';
    angular.module('restApp')
        .controller('MapSearchingController', ['$scope', 'attrs', function($scope, attrs) {
        	console.log("controller");

			var defaults = {
				height: '500px',
				width: '500px',
				position: {
					lat: 49.900,
					lng: 24.8467,
					zoom: 10
				}
			};
			$scope.xmlData = [];
			$scope.resourcesWithNames = [];
			$scope.mapCreated = false;
			$scope.resourcesGeoJsonOn = false;
			$scope.markerList = [];
			$scope.activeTab = 1;
			$scope.findingType = 1;


			$scope.changeTab = function(number) {
				$scope.activeTab = number;
			}


			// Map init

			$scope.updateMapView = function (position, zoom) {
				position = angular.fromJson(position);
				$scope.map.setView(position, zoom);
			};

			$scope.createMap = function () {
				if (!$scope.mapCreated) {
					$('#map').show();
					$scope.map = L.map('map');

					$scope.baseLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						minZoom: 5,
						maxZoom: 19
					});
					$scope.baseLayer.addTo($scope.map);

					initMapElements();

					$scope.updateMapView($scope.center, $scope.center.zoom);

					if (attrs.noupdate !== "true" && "geolocation" in navigator) {
						navigator.geolocation.getCurrentPosition(function (position) {
							$scope.geolocation = {
								lat: position.coords.latitude,
								lng: position.coords.longitude,
								zoom: 15
							};
							$scope.updateMapView($scope.geolocation, $scope.geolocation.zoom);
						});
					}

					$scope.mapCreated = true;
				}
			};

			$scope.removeMap = function () {
				if ($scope.mapCreated) {
					if ($scope.coordinates === 'true')
						$scope.coordinates.removeFrom($scope.map);
					if ($scope.info === 'true')
						$scope.info.removeFrom($scope.map);
					if ($scope.add === 'true')
						$scope.drawControl.removeFrom($scope.map);

					$scope.map.remove();
					$('#map').hide();

					$scope.mapCreated = false;
				}
			};

			$scope.toggleMap = function () {
				if ($scope.mapCreated) {
					$scope.removeMap();
				} else {
					$scope.createMap();
				}
			};

			if (attrs.toggledon === 'true') {
				$scope.createMap();
			}

			$scope.$watch('options.showPolygonOnMap.showPolygon', function (val) {
				console.log(val);
				if ($scope.mapCreated && val) {
					$scope.options.showPolygonOnMap.latlngs = angular.fromJson($scope.options.showPolygonOnMap.latlngs);
					var polygon = L.polygon($scope.options.showPolygonOnMap.latlngs);
					$scope.map.fitBounds(polygon.getBounds());

					if ($scope.geoJsonLayer)
						$scope.map.removeLayer($scope.geoJsonLayer);
					$scope.geoJsonLayer = L.geoJson(L.polygon($scope.options.showPolygonOnMap.latlngs).toGeoJSON(), {
						style: style,
						onEachFeature: infoOnEachFeature
					}).addTo($scope.map);
					$scope.options.showPolygonOnMap.showPolygon = false;
				}
			});

			$scope.$watch('options.toggleMap', function (val) {
				if (val) {
					$scope.toggleMap();
					$scope.options.toggleMap = false;
				}
			});

			$scope.$watch('options.resources.showResources', function (val) {
				if (val) {
					if ($scope.resourcesGeoJsonOn == true) {
						for (var i = 0; i < $scope.resourcesGeoJson.length; i++) {
							$scope.map.removeLayer($scope.resourcesGeoJson[i]);
						}
						$scope.resourcesGeoJsonOn = false;
					}
					$scope.resourcesGeoJson = [];
					for (var i = 0; i < $scope.options.resources.objects.length; i++) {
						console.log($scope.options.resources.objects);
						var geojson = L.polygon(JSON.parse($scope.options.resources.objects[i].coordinates)).toGeoJSON();
						geojson.properties.name = $scope.options.resources.objects[i].name;
						var resource = L.geoJson(geojson, {
							style: styleResource,
							onEachFeature: resourceOnEachFeature
						});
						resource.addTo($scope.map);
						$scope.resourcesGeoJson.push(resource);
					}
					$scope.resourcesGeoJsonOn = true;
					// $scope.options.resources.showResources = false;
				}
			});

			$scope.$watch('options.resources.hideResources', function (val) {
				if (val) {
					if ($scope.resourcesGeoJsonOn == true) {
						for (var i = 0; i < $scope.resourcesGeoJson.length; i++) {
							$scope.map.removeLayer($scope.resourcesGeoJson[i]);
						}
						$scope.resourcesGeoJsonOn = false;
					}
				}
			});


			function initMapElements() {

				initCssProperties();
				initCoordinatesElement();
				initInteractivity();
				initAdding();
				initFinding();
				initSearch();
				initGeojson();

				L.easyButton('glyphicon-star', 
	              function () {
	              	$scope.options.resources.center = $scope.map.getCenter();
	              	$scope.options.resources.getResources = true;
	              	console.log($scope.options.resources);
	              	$scope.$apply();
	              }, '').addTo($scope.map);

				function initCssProperties () {
					$('#map').css({ 'height': attrs.height || defaults.height });
					$('#map').css({ 'width': attrs.width || defaults.width });
				}

				function initCoordinatesElement () {
					if (attrs.coordinates === 'true') {
						$scope.coordinates = L.control.coordinates();
						$scope.coordinates.addTo($scope.map);
					}
				}

				function initInteractivity () {
					if (attrs.interactivity === 'false') {
						$scope.map.dragging.disable();
						$scope.map.touchZoom.disable();
						$scope.map.doubleClickZoom.disable();
						$scope.map.scrollWheelZoom.disable();
						$scope.map.boxZoom.disable();
						$scope.map.keyboard.disable();

						if ($scope.map.tap)
							$scope.map.tap.disable();

						$('#map').css({ 'cursor': 'default' });
						$(".leaflet-control-zoom").css("visibility", "hidden");

					}
				}

				function initAdding () {

					// Controlls localisation

					L.drawLocal.draw.toolbar.actions.title = 'Відмінити створювання';
					L.drawLocal.draw.toolbar.actions.text = 'Відмінити';

					L.drawLocal.draw.toolbar.undo.title = 'Видалити останню точку';
					L.drawLocal.draw.toolbar.undo.text = 'Видалити останню точку';

					L.drawLocal.draw.toolbar.buttons.polygon = 'Створити багатокутник';
					L.drawLocal.draw.toolbar.buttons.rectangle = 'Створити прямокутник';

					L.drawLocal.draw.handlers.polygon.tooltip.start = 'Натисніть на карту, щоб почати створювати багатокутник';
					L.drawLocal.draw.handlers.polygon.tooltip.cont = 'Натисніть на карту, продовжити створювати багатокутник';
					L.drawLocal.draw.handlers.polygon.tooltip.end = 'Натисніть на першу точку, щоб закінчити створювати багатокутник';

					L.drawLocal.draw.handlers.rectangle.tooltip.start = 'Натисніть і потягніть, щоб створити прямокутник';

					L.drawLocal.edit.toolbar.actions.save.title = 'Зберегти зміни';
					L.drawLocal.edit.toolbar.actions.save.text = 'Зберегти';

					L.drawLocal.edit.toolbar.actions.cancel.title = 'Відмінити. Видаляє усі зміни';
					L.drawLocal.edit.toolbar.actions.cancel.text = 'Відмінити';

					L.drawLocal.edit.toolbar.buttons.edit = 'Редагувати об\'єкт';
					L.drawLocal.edit.toolbar.buttons.editDisabled = 'Відсутні об\'єкти для редагування';
					L.drawLocal.edit.toolbar.buttons.remove = 'Видалити об\'єкт';
					L.drawLocal.edit.toolbar.buttons.removeDisabled = 'Відсутні об\'єкти для видалення';

					L.drawLocal.edit.handlers.edit.tooltip.text = 'Переміщайте точки для редагування';

					L.drawLocal.edit.handlers.remove.tooltip.text = 'Натисніть на об\'єкт для видалення';

					if (attrs.add === 'true') {
						$scope.drawnItems = new L.FeatureGroup();
						$scope.map.addLayer($scope.drawnItems);

						$scope.drawControl = new L.Control.Draw({
							draw: {
								polyline: false,
								marker: false,
								circle: false,
								polygon: {
									shapeOptions: {
										color: '#A52A2A'
									}
								}
							},
							edit: {
								featureGroup: $scope.drawnItems,
								edit: false,
								remove: false
							}
						});
						$scope.map.addControl($scope.drawControl);

						$scope.map.on('draw:created', function (e) {
							var type = e.layerType;
							$scope.drawnItem = e.layer;

							$scope.bind = $scope.drawnItem._latlngs;

							$scope.options.created = true;
							var i;
							for (i in $scope.bind) {
								$scope.bind[i].lat = parseFloat($scope.bind[i].lat);
								$scope.bind[i].lng= parseFloat($scope.bind[i].lng);
							}
							$scope.options.newCoords = $scope.bind;
							if ($scope.geoJsonLayer)
								$scope.map.removeLayer($scope.geoJsonLayer);
							$scope.geoJsonLayer = L.geoJson($scope.drawnItem.toGeoJSON(), {
								style: style,
								onEachFeature: infoOnEachFeature
							}).addTo($scope.map);
							$scope.$apply();
						});

						$scope.map.on('draw:drawstart', function() {
							if ($scope.drawnItem) {
								$scope.drawnItems.removeLayer($scope.drawnItem);
								$scope.$apply();
							}
						});

						$scope.map.on('draw:deleted', function() {
							$scope.bind = {};
							$scope.$apply();
						});

						$scope.map.on('draw:editstop', function() {
							$scope.bind = $scope.drawnItem._latlngs;
							$scope.$apply();
						});

				

						


					}
				}





				

				function initFinding() {


					

					if (attrs.find === 'true') {
						/*array for resources on map*/
						var resourcesOnMap = [];

						/*array for markers*/
						var markersOnMap = [];

						/*radius of circle*/
						var radius = 500;

						/*drawing circle*/
						var circle = L.circle(L.latLng(49.83587885628228, 23.99765968322754), radius, {
							opacity: 1,
							weight: 1,
							fillOpacity: 0
						});
						function getRadius() {
			            	(function() {
			            		var value = parseInt($scope.circleRadius);
			            		if(!isNaN(value)){
			            			radius = value;
			            		}
			            	}());
						}



						$scope.map.on('click', function(click) {

						if ($scope.findingType == 2) {
							
							/*showing resources on the map*/
							function showResources(resources) {
								if(resources.length == 0) return;
								for(var i = 0; i < resources.length; i++){
									$scope.map.addLayer(resources[i]);
								}
							}

							function showMarkers(resources) {
								if(resources.length == 0) return;
								for(var i = 0; i < resources.length; i++){
									$scope.map.addLayer(resources[i].bindPopup($scope.markerList[i]));
								}
							}
									
							/*deleting resources from the map*/
							$scope.deleteResources = function(resources) {
							    if(resources.length == 0) return;
							    for(var i = 0; i < resources.length; i++){
								   	$scope.map.removeLayer(resources[i]);
								}
								resources.length = 0;
							}
								var click = click;
								$scope.clickData = [click.latlng.lat, click.latlng.lng];
								console.log($scope.clickData);
								$scope.coordCompare = {
									'44' : 80.208,
									'45' : 78.848,
									'46' : 77.465,
									'47' : 76.057,
									'48' : 74.627,
									'49' : 73.173,
									'50' : 71.697,
									'51' : 70.199,
									'52' : 68.679
								};
								$scope.range = 10;
								$rootScope.y1 = $scope.clickData[0] - (0.00900009 * $scope.range);
								$rootScope.y2 = $scope.clickData[0] + (0.00900009 * $scope.range);
								$rootScope.x1 = $scope.clickData[1] - ((1 / $scope.coordCompare[Math.round($scope.clickData[0])]) * $scope.range);
								$rootScope.x2 = $scope.clickData[1] + ((1 / $scope.coordCompare[Math.round($scope.clickData[0])]) * $scope.range);
								console.log($rootScope.y1, $rootScope.y2, $rootScope.x1, $rootScope.x2);

								// $scope.resources = [];

							
								// $http.get('rest.php/resources/gettingdata' + $rootScope.y1 + '&max_lat=' + $rootScope.y2 + '&min_lng=' + $rootScope.x1 + '&max_lng=' + $rootScope.x2)
								// 	   .then(successHandler)
								// 	   .catch(errorHandler);
								// function successHandler(data) {
								// 	   $scope.resources = data.data;
								// }
								// function errorHandler(data){
								// 	   console.log("Can't reload list!");
								// }
								$scope.xmlReturn = [];
								$scope.xmlReturn.length = 0;
								$.get( 'rest.php/resources/gettingdata?min_lat=' + $rootScope.y1 + '&max_lat=' + $rootScope.y2 + '&min_lng=' + $rootScope.x1 + '&max_lng=' + $rootScope.x2, function(data) {
								  	$scope.xmlReturn = data;
								  	var resources = [];
								  	$scope.resourcesWithNames.length = 0;
									for (var i = 0; i < $scope.xmlReturn.length; i++) {
										var cache = $scope.xmlReturn[i].coordinates;
										resources.push(JSON.parse(cache));
										$scope.resourcesWithNames.push($scope.xmlReturn[i].name);

									}


									/*latitude and longitude(the centroid of a closed polygon)*/
									var items = [];

									/*array for markers*/
									var marker = [];

									/*definition of the centroid of a closed polygon*/		
									function getCentroid(arr) {
									    var twoTimesSignedArea = 0;
									    var cxTimes6SignedArea = 0;
									    var cyTimes6SignedArea = 0;

									    var length = arr.length

									    var x = function (i) { return arr[i % length][0] };
									    var y = function (i) { return arr[i % length][1] };

									    for ( var i = 0; i < arr.length; i++) {
									        var twoSA = x(i) * y(i + 1) - x(i + 1) * y(i);
									        twoTimesSignedArea += twoSA;
									        cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA;
									        cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA;
									    }
									    var sixSignedArea = 3 * twoTimesSignedArea;
									    return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];        
									}

									/*pushing coordinates into array(items)*/
									function fillItems(array) {
										for(var i = 0; i < array.length; i++){
											items.push(getCentroid(array[i]));
										}
									}

									/*pushing items into array(marker) each by each and then add markers*/
									function itemWrap(array) {
										for(var i = 0; i < array.length; i++){
										    var LamMarker = new L.marker([array[i][0], array[i][1]]);
										    marker.push(LamMarker);
									    }
									}

									fillItems(resources);

									itemWrap(items);
									function showResourcesOnMap(clickEvent) {
										getRadius();
			    						circle.setRadius(radius);
									    circle.setLatLng(clickEvent.latlng);
									    circle.addTo($scope.map);
									    $scope.deleteResources(resourcesOnMap);
									    $scope.deleteResources(markersOnMap);
									    $scope.xmlData.length = 0;
									    $scope.markerList.length = 0;
									   	for(var i = 0; i < marker.length; i++){
									   		var distance = clickEvent.latlng.distanceTo(L.latLng(marker[i]._latlng.lat, marker[i]._latlng.lng));
									   		if(distance <= radius){
									    		for(var j = 0; j < resources.length; j++){
									    			var centroid = getCentroid(resources[j]);
									    			if(centroid[0] == marker[i]._latlng.lat && centroid[1] == marker[i]._latlng.lng){
									    				resourcesOnMap.push(L.polygon(resources[j]));
									    				markersOnMap.push(new L.marker([centroid[0], centroid[1]]));
									    				$scope.xmlData.push($scope.xmlReturn[j]);
									    				$scope.markerList.push($scope.xmlReturn[j].name);
									    			}
									    		}
									    		showResources(resourcesOnMap);
									    		showMarkers(markersOnMap);
										    }
									   	}
									   	
									   	// PAGINATION

									   	$scope.partOfList = [];
									   	$scope.listLength = $scope.xmlData.length;
									   	$scope.listRange = 4;
									   	$scope.paginationRange = 5;
									   	$scope.listCacheArray = [];
									   	$scope.listCacheArrayLength = Math.ceil($scope.listLength/$scope.listRange);
									   	$scope.currentPage = 1;
									

									   	$scope.switchPage = function(pageNumber) {
									   		if (pageNumber != "...") {
									   			$scope.partOfList.length = 0;
										   		$scope.currentPage = pageNumber;
										   		for (var i = 0; i < $scope.listCacheArray[pageNumber-1].length; i++) {
										   			$scope.partOfList.push($scope.listCacheArray[pageNumber-1][i]);
										   		}
										   	}

									   	};


									   	$scope.getPages = function() {
							                var pageCount = $scope.listCacheArrayLength, currentPage = $scope.currentPage,
							                    paginationRange = $scope.paginationRange, beforeCenter, afterCenter;
							                $scope.pages = [];

							                if (paginationRange%2 == 0) {
							                    beforeCenter = (paginationRange/2)-1; 
							                    afterCenter = paginationRange/2;
							                } else {
							                    beforeCenter = Math.floor(paginationRange/2);
							                    afterCenter = beforeCenter;
							                }

							                for (var i=1; i<=pageCount; i++) {
							                    if (i >= currentPage - paginationRange && i <= currentPage + paginationRange) $scope.pages.push(i);
							                }


							                console.log($scope.pages, 'first');


							                for (var i = 0; i<=$scope.pages.length-1; i++) {
							                    if ($scope.pages[$scope.pages.length-1] - currentPage >= afterCenter && currentPage - $scope.pages[0] > beforeCenter  ) {
							                        $scope.pages.shift();
							                    } else if ( $scope.pages[$scope.pages.length-1] - currentPage < afterCenter && $scope.pages.length > paginationRange) {
							                        $scope.pages.shift();
							                    }
							                }
							                console.log($scope.pages, 'second');
							                
							                while ($scope.pages.length > paginationRange) $scope.pages.pop();
							                console.log($scope.pages, 'third');
							                if ($scope.pages[0]!=1 && currentPage - beforeCenter >= 0) $scope.pages[0] = "...";
							                console.log($scope.pages, 'fourth');
							                if ($scope.pages[$scope.pages.length-1]!=pageCount) $scope.pages[$scope.pages.length-1] = "...";
							                console.log($scope.pages, 'fifth');        
							                return $scope.pages;
							            };

									   	(function() {
									   		if ($scope.listLength > $scope.listRange) {
									   			for (var i = 0; i < $scope.listCacheArrayLength; i++) {
									   				$scope.listCacheArray.push([]);
									   				for(var j = 0; j < $scope.listRange; j++) {
									   					if ($scope.xmlData.length) $scope.listCacheArray[i].push($scope.xmlData.shift());
									   				}
									   			}
									   			$scope.switchPage(1);
									   		}
									   		else {
									   			for (var i = 0; i < $scope.xmlData.length; i++) {
									   				for(var j = 0; j < $scope.listRange; j++) {
									   					if ($scope.xmlData.length) $scope.partOfList.push($scope.xmlData.shift());
									   				}
									   			}
									   		}
									   	}());

									   	$scope.$apply();


									};

									showResourcesOnMap(click);

								});
						}
						});
					}
					
				}

				function initSearch () {
					
					$scope.map.addControl( new L.Control.Search({
						url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
						jsonpParam: 'json_callback',
						propertyName: 'display_name',
						propertyLoc: ['lat','lon'],
						textPlaceholder: 'Шукати...',
						textCancel: 'Відмінити',
						textErr: 'Не знайдено',
						circleLocation: false,
						markerLocation: true,			
						autoType: false,
						autoCollapse: true,
						minLength: 2,
						zoom:10
					}) );

				}

				function initGeojson () {
					if ($scope.geojson) {
						$scope.geoJsonLayer.addData($scope.geojson);
					}
				}
			}

			// GeoJson objects styling functions

			function style(feature) {
				return {
					fillColor: '#FD8D3C',
					weight: 2,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.7
				};
			}

			function styleResource(feature) {
				return {
					fillColor: '#008000',
					weight: 2,
					opacity: 1,
					color: 'white',
					dashArray: '3',
					fillOpacity: 0.7
				};
			}

			function infoHighlightFeature(e) {
				var layer = e.target;

				layer.setStyle({
					weight: 5,
					color: '#666',
					dashArray: '',
					fillOpacity: 0.7
				});
			}

			function infoResetHighlight(e) {
				$scope.geoJsonLayer.resetStyle(e.target);
			}

			function infoZoomToFeature(e) {
				$scope.map.fitBounds(e.target.getBounds());
			}

			function infoOnEachFeature(feature, layer) {
				layer.on({
					mouseover: infoHighlightFeature,
					mouseout: infoResetHighlight,
					click: infoZoomToFeature
				});
			}

			function resourceOnEachFeature(feature, layer) {
				layer.bindPopup(feature.properties.name);
			}

			// GeoJson functions

			function toGeoJSON(pointsArray) {
				var geojson = {};
				geojson['type'] = 'FeatureCollection';
				geojson['features'] = [];
				var newFeature = {
					"type": "Feature",
					"geometry": {
						"type": "Polygon",
						"coordinates": []
					},
					"properties": {
						"title": "",
						"description":""
					}
				};

				for (var pointIndex in pointsArray) {
					var array = [parseFloat(pointsArray[pointIndex].lat), parseFloat(pointsArray[pointIndex].lng)];
					newFeature.geometry.coordinates.push(array);
				}
				geojson['features'].push(newFeature);
				return geojson;
			}

			function toggleResources () {
				$scope.options.resources.showResources = true;
			}

        }]);


})();

			
