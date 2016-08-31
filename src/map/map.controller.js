(function () {
    'use strict';

    angular.module('app')
        .controller('map', function (placesService) {
            var vm = this;
            placesService.get()
                .then(data => {
                    var responses = data.data.map(d => d.response[0]);
                    responses.forEach(d => {
                        createMarker(vm.map, new google.maps.LatLng(d.geometry.location.lat, d.geometry.location.lng));
                    })
                });
        });

    function createMarker(map, location) {
        var markerOptions = {
            position: location,
            map: map,
            clickable: true
        };

        var marker = new google.maps.Marker(markerOptions);
    }
} ());