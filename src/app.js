(function () {
    'use strict';
    angular.module('app', ['ui.router'])
        .config(function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: false
            });
        })
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state({
                    name: 'general',
                    url: '/general',
                    template: '<general></general>'
                })
                .state({
                    name: 'add',
                    url: '/add',
                    template: '<add-place><add-place>'
                });
            $urlRouterProvider.otherwise('general');
        });
} ());