(function () {

	angular.module('restApp').controller("MapCtrl", ["$scope", '$rootScope', function ($scope, $rootScope) {
		$scope.center = {
			lat: 49.900,
			lng: 24.8467,
			zoom: 6
		};

		$scope.options = {
			toggleMap: false,
			showPolygonOnMap: {
				showPolygon: false,
				latlngs: []
			}
		};

		$scope.showPolygonOnMap = function (coordinates) {
			$scope.options.showPolygonOnMap.showPolygon = true;
			$scope.options.showPolygonOnMap.latlngs = coordinates;
		}

		$scope.toggleMap = function () {
			$scope.options.toggleMap = true;
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
