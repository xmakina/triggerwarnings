(function() {
    'use strict';

    angular.module('triggerWarningsApp.home', []);

    angular.module('triggerWarningsApp.home').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('dashboard', {
                parent: 'root',
                url: '/',
                templateUrl: 'home/partials/dashboard.html',
                controller: 'HomeCtrl'
            });
        }
    ]);

    return angular;
})();
