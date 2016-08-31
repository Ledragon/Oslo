(function () {
    'use strict';

    angular.module('app')
        .directive('general', function () {
            return {
                templateUrl: 'general/general.html',
                controller: 'general',
                controllerAs: 'vm',
                bindToController: true,
               
                replace: true,
                scope: {}
            }
        });
} ());