(function () {
    'use strict';
    angular.module('app')
        .factory('firebaseService', function ($q, $http) {
            return {
                get: function () {
                    var dfd = $q.defer();

                    return dfd.promise;
                },
                save: function (item) {
                    var database = firebase.database();
                    var auth = firebase.auth();

                    auth.signInAnonymously()
                        .catch(function (error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            console.error(errorMessage);
                            // ...
                        });

                    auth.onAuthStateChanged(function (user) {
                        if (user) {
                            // User is signed in.
                            var isAnonymous = user.isAnonymous;
                            var uid = user.uid;
                            if (!item.id) {
                                var key = database.ref().child('places')
                                    .push().key;
                                item.id = key;
                            }
                            database.ref('places/'+key)
                                .set(item);
                            // ...
                        } else {
                            console.log('pas ok')
                            // User is signed out.
                            // ...
                        }
                        // ...
                    });
                }
            }
        });
} ());