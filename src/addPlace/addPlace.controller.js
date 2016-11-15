(function () {
    'use strict';

    angular.module('app')
        .controller('addPlace', function ($scope, placesService, firebaseService) {
            var vm = this;
            this.isLoading = true;
            firebaseService.getAll()
                .then(function (data) {
                    vm.places = data;
                })
                .finally(function () {
                    vm.isLoading = false;
                });

            this.save = function () {
                var toSave = this.selectedItem;
                firebaseService.save(toSave);
            }

            this.unselect = function () {
                this.selectedItem = null;
            };

            this.createNew = function () {
                this.selectedItem = {
                }
            };

            this.search = function () {

            }
        });

} ());