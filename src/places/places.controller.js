(function () {
    'use strict';
    angular.module('app')
        .controller('places', function (firebaseService) {
            var vm = this;
            firebaseService.getAll()
                .then(data => {
                    vm.places = data;
                });
        });
} ());