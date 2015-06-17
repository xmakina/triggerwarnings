(function() {
    'use strict';

    angular.module('triggerWarningsApp.shows', []);

    angular.module('triggerWarningsApp.shows').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('shows', {
                parent: 'dashboard',
                url: 'shows',
                abstract: 'true',
                template:'<ui-view></ui-view>'
            });

            $stateProvider.state('shows.list', {
                url:'/',
                templateUrl: 'shows/partials/list.html',
                controller: 'ShowsCtrl'
            });

            $stateProvider.state('shows.detail', {
                url:'/:showId',
                resolve:{
                    getShow:['$stateParams', 'tvdb',
                    function($stateParams, tvdb){
                        return tvdb.getShow($stateParams.showId);
                    }]
                },
                abstract:'true',
                template:'<ui-view></ui-view>'
            });

            $stateProvider.state('shows.detail.page', {
                url:'',
                templateUrl:'shows/partials/details.html',
                controller:'ShowsCtrl'
            });
        }
    ]);

    return angular;
})();
