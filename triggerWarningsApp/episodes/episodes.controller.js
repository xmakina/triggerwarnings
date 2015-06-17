(function() {
    'use strict';

    angular.module('triggerWarningsApp.episodes')
        .controller('EpisodesCtrl', [
            '$scope', 'triggers', 'tvdb',
            function($scope, triggers, tvdb) {
                $scope.show = tvdb.show;
                $scope.episode = tvdb.episode;
                $scope.triggerList = triggers.triggerList;

                $scope.removeTrigger = function(trigger) {
                    triggers.removeTrigger(trigger).then(function() {
                        return triggers.getTriggers($scope.episode.id).then(function() {
                            $scope.triggerList = triggers.triggerList;
                        });
                    });
                };
            }
        ]);

    return angular;
})();
