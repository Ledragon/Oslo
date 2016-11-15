(function () {
    'use strict';

    angular.module('app')
        .directive('login', function () {
            return {
                templateUrl: 'login/login.html',
                controller: 'login',
                controllerAs: 'vm',
                bindToController: true,
               
                replace: true,
                scope: {}
            }
        });
} ());