(function() {
    'use strict';

    angular.module('triggerWarningsApp.episodes')
        .controller('EpisodesCtrl', [
            '$scope', 'triggers','tvdb',
            function($scope, triggers, tvdb) {
            	console.log('tvdb.episode', tvdb.episode);
            	$scope.episode = tvdb.episode;
            	$scope.triggers = triggers.triggers;
            }
        ]);

    return angular;
})();
