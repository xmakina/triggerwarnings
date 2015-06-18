(function() {
    'use strict';

    angular.module('triggerWarningsApp.shows')
        .controller('TriggersCtrl', [
            '$scope', 'tvdb', 'triggers', '$state',
            function($scope, tvdb, triggers, $state) {
                $scope.show = tvdb.show;
                $scope.episode = tvdb.episode;
                $scope.trigger = triggers.trigger;

                $scope.tagOptions = {
                    'multiple': true,
                    'simple_tags': true,
                    'tags': ['racism', 'sexual violence', 'rape', 'misogyny', 'domestic abuse'],
                };

                $scope.addTrigger = function(trigger) {
                    if (trigger.episode === undefined) {
                        var sentTrigger = angular.copy(trigger);

                        sentTrigger.show = $scope.show.tvShow.id;
                        sentTrigger.showName = $scope.show.tvShow.name;
                        sentTrigger.episode = $scope.episode.id;
                        sentTrigger.episodeName = $scope.episode.name;

                        triggers.addTrigger(sentTrigger).then(function() {
                            $state.go('episodes.detail.page');
                        });
                    } else {
                        triggers.updateTrigger(trigger).then(function() {
                            $state.go('episodes.detail.page');
                        });
                    }
                };
            }
        ]);

    return angular;
})();
