(function() {
    'use strict';

    angular.module('triggerWarningsApp.episodes', []);

    angular.module('triggerWarningsApp.episodes').config([
        '$stateProvider',
        function($stateProvider) {
            $stateProvider.state('episodes', {
                parent: 'shows.detail',
                url: '/episodes',
                abstract: 'true',
                template: '<ui-view></ui-view>'
            });

            $stateProvider.state('episodes.detail', {
                url: '/:episodeId',
                abstract: 'true',
                template: '<ui-view></ui-view>',
                resolve: {
                    setEpisode:['$stateParams', 'tvdb',
                    function($stateParams, tvdb){
                        return tvdb.setEpisode($stateParams.episodeId);
                    }],
                    getTriggers: ['$stateParams', 'triggers',
                        function($stateParams, triggers) {
                            return triggers.getTriggers($stateParams.episodeId);
                        }
                    ]
                }
            });

            $stateProvider.state('episodes.detail.page', {
                url: '',
                templateUrl: 'episodes/partials/details.html',
                controller: 'EpisodesCtrl'
            });
        }
    ]);

    return angular;
})();
