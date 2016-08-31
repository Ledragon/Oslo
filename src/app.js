(function () {
    'use strict';

    function init() {
        var mapDiv = document.getElementById('map');
        var location = new google.maps.LatLng(59.910696, 10.736904);
        var mapOptions = { center: location, zoom: 13 };
        var map = new google.maps.Map(mapDiv, mapOptions);
        d3.json('data/results.json', (error, data) => {
            if (error) {
                console.error(error);
            } else {
                var complete = data.data;
                data = data.data.map(d => d.request);
                // createList(data);
                var responses = complete.map(d => d.response[0]);
                responses.forEach(d => {
                    createMarker(map, new google.maps.LatLng(d.geometry.location.lat, d.geometry.location.lng));
                })
            }
        })
    }

    function createList(data) {
        var enterSelection = d3.select('#places')
            .selectAll('.place')
            .data(data)
            .enter();
        var place = enterSelection.append('div')
            .classed('place', true)
            .classed('pane', true);

        let title = place
            .append('div')
            .classed('pane-heading', true);
        title.append('h1')
            .text(d => d.Name);
        place.append('div')
            .classed('vicinity', true)
            .text(d => d.Vicinity);
    }

    function search(location, map, data) {

        var service = new google.maps.places.PlacesService(map);
        data.forEach(d => {
            if (!d.Lat) {
                var request = {
                    radius: 5000,
                    location: location
                };
                request.keyword = d.Name;
                service.nearbySearch(request, (result, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(JSON.stringify(d));
                        console.log(JSON.stringify(result));
                        if (result.length > 0) {
                            createMarker(map, result[0].geometry.location)
                        }
                    }
                });
            }
        });
    }

    function createMarker(map, location) {
        var markerOptions = {
            position: location,
            map: map,
            clickable: true
        };

        var marker = new google.maps.Marker(markerOptions);
    }

    init();

    angular.module('app',[])
} ());