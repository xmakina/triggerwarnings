(function() {
    'use strict';
    angular.module('triggerWarningsApp', [
        'ui.router',
        'angular-loading-bar',
        'restangular',
        'ui.select2',
        'triggerWarningsApp.templates',
        'triggerWarningsApp.home',
        'triggerWarningsApp.auth',
        'triggerWarningsApp.tvdb'
    ]);

    angular.module('triggerWarningsApp').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('root', {
                url: '',
                abstract: true,
                template: '<div ui-view></div>'
            });
            $urlRouterProvider.otherwise('/');
        }
    ]);

    return angular;
})();
