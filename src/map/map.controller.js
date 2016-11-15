(function () {
    'use strict';
    var _markers = [];
    angular.module('app')
        .controller('map', function ($scope, placesService, firebaseService) {
            var vm = this;
            var _data;
            var _marker;
            var _bandb = {
                "name": "Villa Frogner Bed & Breakfast",
                "vicinity": "Nordraaks gate 26, 0260 Oslo, Norway",
                "latitude": 59.924018,
                "longitude": 10.709738000000016
            };
            var _airport = { "name": "Oslo Airport", "vicinity": "Edvard Munchs veg, 2061 Gardermoen, Norway", "latitude": 60.1975501, "longitude": 11.100415300000009 };
            // createMarker(vm.map, new google.maps.LatLng(_bandb.latitude, _bandb.longitude));
            firebaseService.getAll()
                .then(function (data) {
                    _data = data;
                    data.forEach(function (d) {
                        createMarker(vm.map, new google.maps.LatLng(d.latitude, d.longitude));
                    });
                });
            $scope.$watch(() => this.map, (newValue) => {
                var location = new google.maps.LatLng(_bandb.latitude, _bandb.longitude);
                var markerOptions = {
                    position: location,
                    map: newValue,
                    clickable: false,
                    label: 'B&B',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 6,
                        fillColor: 'red',
                        strokeColor: 'blue',
                        fillOpacity: 0.5,
                        strokeWeight: 1
                    }
                };

                var marker = new google.maps.Marker(markerOptions);
                location = new google.maps.LatLng(_airport.latitude, _airport.longitude);
                markerOptions = {
                    position: location,
                    map: newValue,
                    clickable: false,
                    label: 'airport',
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                        scale: 6,
                        fillColor: 'orange',
                        strokeColor: 'yellow',
                        fillOpacity: 0.5,
                        strokeWeight: 1
                    }
                };

                marker = new google.maps.Marker(markerOptions);
            })

            $scope.$watch(() => vm.selectedPlace, (newValue) => {
                if (newValue) {
                    var res = _.find(_data, d => d.name === newValue.name);
                    if (res) {
                        var index = _data.indexOf(res);
                        _markers.forEach(m => m.setIcon(null));
                        var m = _markers[index];
                        m.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                    }
                }
            });
        });

    function createMarker(map, location) {
        var markerOptions = {
            position: location,
            map: map,
            clickable: true
        };

        var marker = new google.maps.Marker(markerOptions);
        _markers.push(marker);
    }
} ());