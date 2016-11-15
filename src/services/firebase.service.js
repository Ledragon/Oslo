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
                getAll: readAll,
                get: function (key) {
                    var dfd = $q.defer();

                    return dfd.promise;
                },
                save: function (item) {
                    var database = firebase.database();
                    if (!item.id) {
                        var key = database.ref().child('places')
                            .push().key;
                        item.id = key;
                    }
                    database.ref('places/' + key)
                        .set(item);
                },
                login: function (email, password) {
                    var dfd = $q.defer();
                    var auth = firebase.auth();
                    auth.signInWithEmailAndPassword(email, password)
                        .then(function (data) {
                            if (data.uid) {
                                dfd.resolve();
                            } else {
                                dfd.reject();
                            }
                        })
                        .catch(function () { dfd.reject() })
                        ;
                    return dfd.promise;
                }
            }
        });
} ());