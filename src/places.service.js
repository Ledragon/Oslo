(function () {
    'use strict';
    angular.module('app')
        .factory('placesService', function ($q, $http) {
            _places;
            return {
                get: () => {
                    var dfd = $q.defer();
                    if (!_places) {
                        $http.get('data/results.json')
                            .then(data => {
                                _places = data.data;
                                dfd.resolve(_places);
                            });
                    } else {
                        dfd.resolve(_places);
                    }
                    return dfd.promise;
                }
            }
        });
} ());