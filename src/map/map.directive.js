(function () {
    'use strict';

    angular.module('app')
        .directive('map', function () {
            return {
                templateUrl: 'map/map.html',
                controller: 'map',
                controllerAs: 'vm',
                bindToController: true,
                link: ($scope, element) => {
                    var mapDiv = element[0]//.children[1];
                    var location = new google.maps.LatLng(59.910696, 10.736904);
                    var mapOptions = { center: location, zoom: 13 };
                    var map = new google.maps.Map(mapDiv, mapOptions);
                    $scope.vm.map = map;
                },
                replace: true,
                scope: {
                    selectedPlace:'='
                }
            }
        });
} ());