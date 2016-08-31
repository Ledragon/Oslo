(function () {
    'use strict';
    angular.module('app')
        .controller('places', function (placesService) {
            var vm = this;
            placesService.get()
                .then(data => {
                    vm.places = data.data.map(d => d.request)
                });
        });
} ());