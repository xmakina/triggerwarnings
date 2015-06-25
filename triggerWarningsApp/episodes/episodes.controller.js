(function() {
    'use strict';

    angular.module('triggerWarningsApp.episodes')
        .controller('EpisodesCtrl', [
            '$scope', 'triggers', 'tvdb',
            function($scope, triggers, tvdb) {
                $scope.show = tvdb.show;
                $scope.episode = tvdb.episode;
                $scope.triggerList = triggers.triggerList;
            }
        ]);

    return angular;
})();
