(function() {
    'use strict';

    angular.module('triggerWarningsApp.triggers', []);
    angular.module('triggerWarningsApp.triggers').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('triggers', {
                parent: 'episodes.detail',
                url: '/triggers',
                abstract: 'true',
                template: '<ui-view></ui-view>'
            });

            $stateProvider.state('triggers.add', {
                url: '/add',
                templateUrl: 'triggers/partials/add.html',
                controller: 'TriggersCtrl'
            });

            $stateProvider.state('triggers.detail', {
                url: '/:triggerId',
                templateUrl: 'triggers/partials/details.html',
                controller: 'TriggersCtrl'
            });
        }
    ]);
    return angular;
})();
