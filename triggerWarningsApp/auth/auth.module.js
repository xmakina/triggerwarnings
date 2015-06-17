(function() {
    'use strict';
    angular.module('triggerWarningsApp.auth', ['restangular']);
    angular.module('triggerWarningsApp.auth').config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.state('auth', {
                abstract: true,
                parent: 'dashboard',
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
                controller: ['$state', function($state) {
                    $state.go('dashboard');
                }],
                parent: 'auth',
                resolve: {
                    logout: ['auth', '$state', function(auth) {
                        auth.logOut();
                    }]
                }
            });
        }
    ]);

    return angular;
})();
