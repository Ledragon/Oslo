(function () {
    'use strict';
    angular.module('app')
        .factory('firebaseService', function ($q, $http) {
            function readAll() {
                var database = firebase.database();
                var dfd = $q.defer();
                database.ref('places').once('value')
                    .then(function (data) {
                        var values = data.val();
                        dfd.resolve(values);
                    })
                    .catch(function () { dfd.reject() });
                return dfd.promise;
            }
            return {
                getAll: function () {
                    var auth = firebase.auth();
                    if (!auth.currentUser) {
                        var dfd = $q.defer();
                        auth.signInAnonymously()
                            .catch(function (error) {
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                console.error(errorMessage);
                                dfd.reject();
                            });
                        auth.onAuthStateChanged(function (user) {
                            if (user) {
                                readAll()
                                    .then(function (data) {
                                        dfd.resolve(data);
                                    });
                            } else {
                                console.log('pas ok');
                                dfd.reject();
                            }
                        });
                        return dfd.promise;
                    } else {
                        return readAll();
                    }
                },
                get: function (key) {
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
                            database.ref('places/' + key)
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