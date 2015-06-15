(function() {
    'use strict';
    angular.module('triggerWarningsApp.auth', ['restangular']);
    angular.module('triggerWarningsApp.auth').config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.state('auth', {
                abstract: true,
                parent: 'root',
                url: '',
                template: '<div ui-view></div>'
            });
            $stateProvider.state('auth.login', {
                url: '/login',
                templateUrl: 'auth/partials/login.html',
                controller: 'AuthCtrl',
                parent: 'auth'
            });
            $stateProvider.state('auth.register', {
                url: '/register',
                templateUrl: 'auth/partials/register.html',
                controller: 'AuthCtrl',
                parent: 'auth'
            });
            $stateProvider.state('auth.logout', {
                url: '/logout',
                template: '<div ui-view></div>',
                controller: 'AuthCtrl',
                parent: 'auth',
                resolve: {
                    logout: ['auth', function(auth) {
                        auth.logOut();
                    }]
                }
            });
        }
    ]);

    return angular;
})();
