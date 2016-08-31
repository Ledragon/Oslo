(function () {
    'use strict';
    angular.module('app')
        .controller('places', function(placesService){
            var vm = this;
            placesService.get()
                .then(data =>
                {
                    console.log(data);
 vm.places = data.data.map(d => d.request)
                }   );            
            // vm.places = [{ Name: 'toto', 'Vicinity': 'toto' }];
        });
} ());