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
                    'tags': [],
                };

                $scope.addTrigger = function(trigger) {
                    console.log('trigger', trigger);
                    if (trigger.episode === undefined) {
                        var sentTrigger = angular.copy(trigger);
                        sentTrigger.episode = $scope.episode.id;
                        triggers.addTrigger(sentTrigger).then(function() {
                            $state.go('episodes.detail.page');
                        });
                    } else {
                        console.log('updating', trigger);
                        triggers.updateTrigger(trigger).then(function() {
                            $state.go('episodes.detail.page');
                        });
                    }
                };
            }
        ]);

    return angular;
})();
