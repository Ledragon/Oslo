(function () {
    'use strict';
    angular.module('app')
        .factory('googlePlacesService', function ($q, $http) {
            return {
                search: function (map, name) {
                    var dfd = $q.defer();
                    var service = new google.maps.places.PlacesService(map);
                    var request = {
                        location: new google.maps.LatLng(59.9070548, 10.68596500000001),
                        radius: 500,
                    query:name};
                    service.textSearch(request, function (results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            console.log(results)
                            var toSend = results.map(function (d) {
                                return {
                                    name: d.name,
                                    vicinity: d.formatted_address,
                                    latitude: d.geometry.location.lat(),
                                    longitude:d.geometry.location.lng()
                                }
                            })
                            dfd.resolve(toSend);
                            
                        }
                    });
                    return dfd.promise;
                }
            }
        });
} ());