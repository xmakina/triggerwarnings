(function() {
    'use strict';

    angular.module('triggerWarningsApp.home', []);

    angular.module('triggerWarningsApp.home').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('dashboard', {
                abstract: 'true',
                parent: 'root',
                url: '/',
                templateUrl: 'home/partials/dashboard.html',
                controller: 'HomeCtrl'
            });

            $stateProvider.state('dashboard.page', {
                url: '',
                resolve: {
                    getLatest: [
                        'triggers',
                        function(triggers) {
                            return triggers.getLatest();
                        }
                    ]
                },
                templateUrl: 'home/partials/page.html',
                controller: 'HomeCtrl'
            });
        }
    ]);

    return angular;
})();
