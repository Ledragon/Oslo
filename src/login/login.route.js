(function () {
    'use strict';
    angular.module('app')
    .config(function ($stateProvider) {
            $stateProvider
                .state({
                    name: 'login',
                    url: '/login',
                    template: '<login></login>'
                })
        });
} ());