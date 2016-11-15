(function () {
    'use strict';

    angular.module('app')
        .controller('search', function ($scope, googlePlacesService) {
            var vm = this;
            this.search = function () {
                googlePlacesService.search(this.scopeMap, this.searchString)
                    .then(function (data) {
                        console.log(JSON.stringify(data[0]));
                    });
            }
        });

} ());