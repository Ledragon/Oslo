(function () {
    'use strict';

    angular.module('app')
        .directive('places', function () {
            return {
                templateUrl: 'places/places.html',
                controller: 'places',
                controllerAs: 'vm',
                bindToController: true,
                scope: {
                    'selectedPlace': '='
                }
            }
        });
} ());