(function () {
    'use strict';
    angular.module('app')
        .factory('placesService', function ($q, $http) {
            return {
                get: () => {
                    var dfd = $q.defer();
                    $http.get('data/results.json')
                        .then(data => dfd.resolve(data.data));
                    return dfd.promise;
                }
            }
        });
} ());