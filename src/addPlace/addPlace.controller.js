(function () {
    'use strict';

    angular.module('app')
        .controller('addPlace', function ($scope, placesService, firebaseService) {
            var vm = this;
            this.isLoading = true;
            firebaseService.getAll()
                .then(function (data) {
                    var places = [];
                    for (var key in data) {
                        places.push(data[key]);
                    }
                    places.forEach(function (p) {
                        p.targetDate = new Date(p.targetDate);
                    })
                    vm.places = places;
                })
                .finally(function () {
                    vm.isLoading = false;
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