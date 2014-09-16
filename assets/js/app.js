var app = angular.module('App', ['google-maps']);

app.controller('MainController', ['$scope', '$rootScope', function ($scope, $rootScope) {

	$scope.markers = JSON.parse(localStorage.getItem('markers')) || [];
	$scope.local = {};

	$scope.map = {
		center: {
			latitude: -23.511810,
			longitude: -47.470973
		},
		events: {
			click: function (maps, eventName, args) {
				$scope.local.latitude = args[0].latLng.lat();
				$scope.local.longitude = args[0].latLng.lng();
			}
		},
		zoom: 17
	};

	$scope.addMarker = function (local) {
		$scope.markers.push(createMarker(local));

		localStorage.setItem('markers', JSON.stringify($scope.markers));

		$scope.clearForm();
	};

	$scope.clearForm = function () {
		$scope.local.title = '';
		$scope.local.latitude = '';
		$scope.local.longitude = '';
	};

	$scope.removeMarker = function (index) {
		$scope.markers.splice(index, 1);

		localStorage.setItem('markers', JSON.stringify($scope.markers));
	};

	var createMarker = function (local) {
		return {
			id: $scope.markers.length + 1,
			latitude: local.latitude,
			longitude: local.longitude,
			title: local.title,
			show: false,
			onClick: function () {
				this.show = !this.show;
			}
		};
	};

}]);