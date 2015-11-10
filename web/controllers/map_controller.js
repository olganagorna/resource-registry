(function () {

	angular.module('restApp').controller("MapCtrl", ["$scope", '$rootScope', function ($scope, $rootScope) {
		$scope.center = {
			lat: 49.900,
			lng: 24.8467,
			zoom: 6
		};

		$scope.objects = [
			{
				name: 'Піскові Озера Старі',
				latlngs: [[49.7848,24.1025],[49.7883,24.1402],[49.7697,24.1334],[49.7799,24.1011]]
			},
			{
				name: 'Шевченківський гай',
				latlngs: [[49.8247,24.1069],[49.816,24.1235],[49.8309,24.1247],[49.8328,24.0957]]
			}
		];

		$scope.options = {
			toggleMap: false,
			showPolygonOnMap: {
				showPolygon: false,
				latlngs: []
			},
			resources: {
				showResources: false,
				objects: []
			}
		};

		$scope.showPolygonOnMap = function (coordinates) {
			$scope.options.showPolygonOnMap.showPolygon = true;
			$scope.options.showPolygonOnMap.latlngs = coordinates;
		}

		$scope.toggleMap = function () {
			$scope.options.toggleMap = true;
		}

		$scope.toggleResourcesOnMap = function (objects) {
			if ($scope.options.resources.showResources) {
				$scope.options.resources.hideResources = true;
				$scope.options.resources.showResources = false;
			} else {
				$scope.options.resources.showResources = true;
				$scope.options.resources.hideResources = false;
			}
			$scope.options.resources.objects = objects;
		}

		$scope.$watch('options.created', function(val){

			if(val) {
				$rootScope.coords = [];
				var i;
				for (i in $scope.options.newCoords) {
					$rootScope.coords.push({lat: $scope.options.newCoords[i].lat, lng: $scope.options.newCoords[i].lng});
				}
				$scope.options.created = false;
				$rootScope.mapOptions.created = true;
			}

		});
	}]);

})();
