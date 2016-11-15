(function () {
    'use strict';

    angular.module('app')
        .controller('login', function ($scope, $state, firebaseService) {
            var vm = this;
            this.login = function () {
                firebaseService.login(this.email, this.password)
                    .then(function () {
                        $state.go('general');
                    });
            }
        });

} ());