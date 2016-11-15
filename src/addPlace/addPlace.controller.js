(function () {
    'use strict';

    angular.module('app')
        .controller('addPlace', function ($scope, placesService, firebaseService) {
            var vm = this;
            placesService.get()
                .then(data => {
                    console.log(data)
                    vm.places = data.data;
                });

            this.save = function () {
                var toSave = {
                    name: this.selectedItem.request.Name,
                    address: this.selectedItem.request.Address,
                    vicinity: this.selectedItem.request.Vicinity,
                    hours: this.selectedItem.request.Hours,
                    price: this.selectedItem.request.Price,
                    osloPass: this.selectedItem.request.OsloPass,
                    id: this.selectedItem.id ? this.selectedItem.id : 0,
                    latitude: this.selectedItem.response[0].geometry.location.lat,
                    longitude: this.selectedItem.response[0].geometry.location.lng,
                    targetDate: this.selectedItem.request.TargetDate.toISOString()
                };
                firebaseService.save(toSave);
            }

            this.unselect = function () {
                this.selectedItem = null;
            };

            this.createNew = function () {
                this.selectedItem = {
                    request: {
                    },
                    response: [{
                        geometry: {
                            location: {
                                lat: 0,
                                lng: 0
                            }
                        }
                    }]
                }
            };

            this.search = function () {

            }
        });

} ());