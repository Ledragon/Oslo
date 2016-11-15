(function () {
    'use strict';

    angular.module('app')
        .controller('addPlace', function ($scope,placesService) {
            var vm = this;
            placesService.get()
                .then(data => {
                    console.log(data)
                    vm.places = data.data;
            })
        });

} ());