(function () {
    'use strict';

    angular.module('app')
        .directive('addPlace', function () {
            return {
                templateUrl: 'addPlace/addPlace.html',
                controller: 'addPlace',
                controllerAs: 'vm',
                bindToController: true,
               
                replace: true,
                scope: {}
            }
        });
} ());