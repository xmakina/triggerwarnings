angular.module('superScoreboardApp', [
    'ui.router',
    'angular-loading-bar',
    'restangular',
    'superScoreboardApp.templates',
    'superScoreboardApp.home',
    'superScoreboardApp.auth'
]);

angular.module('superScoreboardApp').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('root', {
            url: '',
            abstract: true,
            template: '<div ui-view></div>'
        });
        $urlRouterProvider.otherwise('/');
    }
]);