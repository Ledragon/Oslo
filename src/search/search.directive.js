(function () {
    'use strict';

    angular.module('app')
        .directive('search', function () {
            return {
                templateUrl: 'search/search.html',
                controller: 'search',
                controllerAs: 'vm',
                bindToController: true,
               
                replace: true,
                scope: {
                    scopeMap: '=',
                    results:'='
                }
            }
        });
} ());