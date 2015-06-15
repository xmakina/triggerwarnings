(function() {
    'use strict';
    angular.module('triggerWarningsApp.auth')
        .factory('auth', [
            '$http', '$window', 'Restangular',
            function($http, $window, Restangular) {
                var auth = {};

                auth.saveToken = function(token) {
                    $window.localStorage['triggerWarningsApp-token'] = token;
                };

                auth.getToken = function() {
                    return $window.localStorage['triggerWarningsApp-token'];
                };

                auth.isLoggedIn = function() {
                    var token = auth.getToken();

                    if (token) {
                        var payload = JSON.parse($window.atob(token.split('.')[1]));

                        return payload.exp > Date.now() / 1000;
                    } else {
                        return false;
                    }
                };

                auth.isLoggedIn = function() {
                    var token = auth.getToken();

                    if (token) {
                        var payload = JSON.parse($window.atob(token.split('.')[1]));

                        return payload.exp > Date.now() / 1000;
                    } else {
                        return false;
                    }
                };

                auth.register = function(user) {
                    return $http.post('/register', user).success(function(data) {
                        auth.saveToken(data.token);
                    });
                };

                auth.logIn = function(user) {
                    return $http.post('/login', user).success(function(data) {
                        auth.saveToken(data.token);
                        Restangular.setDefaultHeaders({
                            'Authorization': 'Bearer ' + auth.getToken()
                        });
                    });
                };

                auth.logOut = function() {
                    $window.localStorage.removeItem('triggerWarningsApp-token');
                    location.reload();
                };

                Restangular.setDefaultHeaders({
                    'Authorization': 'Bearer ' + auth.getToken()
                });
                return auth;
            }
        ]);

    return angular;
})();
