(function () {
    'use strict';

    function init() {
        var mapDiv = document.getElementById('map');
        var location = new google.maps.LatLng(59.910696, 10.736904);
        var mapOptions = { center: location, zoom: 13 };
        var map = new google.maps.Map(mapDiv, mapOptions);

        d3.csv('data/attractions.csv', (error, data) => {
            if (error) {
                console.error(error);
            } else {
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
                // title.append('i')
                //     .classed('fa fa-fw', true)
                // .classed('building', d=>d.Type==='Museum')
                place.append('div')
                    .classed('vicinity', true)
                    .text(d => d.Vicinity);
                search(location, map, data)
            }
        });
    }

    function search(location, map, data) {

        var service = new google.maps.places.PlacesService(map);
        data.forEach(d => {
            var request = {
                radius: 5000,
                location: location
            };
            request.keyword = d.Name;
            service.nearbySearch(request, (result, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(JSON.stringify(d));
                    console.log(JSON.stringify(result));
                }
            })
        });
    }

    init();
} ());