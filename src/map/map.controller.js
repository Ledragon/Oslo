(function () {
    'use strict';
    var _markers = [];
    angular.module('app')
        .controller('map', function ($scope, placesService) {
            var vm = this;
            var _data;
            var _marker;
            placesService.get()
                .then(data => {
                    var responses = data.data.map(d => d.response[0]);
                    _data = data.data;
                    responses.forEach(d => {
                        createMarker(vm.map, new google.maps.LatLng(d.geometry.location.lat, d.geometry.location.lng));
                    });
                });
            $scope.$watch(() => vm.selectedPlace, (newValue) => {
                if (newValue) {
                    var res = _.find(_data, d => d.request.Name === newValue.Name);
                    if (res) {
                        var index = _data.indexOf(res);
                        _markers.forEach(m => m.setIcon(null));
                        var m = _markers[index];
                        m.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                    }
                }
            })
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