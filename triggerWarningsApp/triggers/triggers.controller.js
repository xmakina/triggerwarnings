(function() {
    'use strict';

    angular.module('triggerWarningsApp.shows')
        .controller('TriggersCtrl', [
            '$scope', 'tvdb', 'triggers', '$state', 'ngToast',
            function($scope, tvdb, triggers, $state, ngToast) {
                $scope.show = tvdb.show;
                $scope.episode = tvdb.episode;
                $scope.trigger = triggers.trigger;
                $scope.measure = '';

                $scope.$watch('stopTime', function(newval, oldval) {
                    if (oldval === newval) {
                        return;
                    }

                    if (newval < $scope.trigger.start) {
                        $scope.stopTime = $scope.trigger.start;
                        return;
                    }

                    $scope.trigger.duration = newval - $scope.trigger.start;
                });

                $scope.$watch('trigger.duration', function(newval, oldval) {
                    if (oldval === newval) {
                        return;
                    }

                    $scope.stopTime = $scope.trigger.start + $scope.trigger.duration;
                });

                $scope.$watch('trigger.start', function(newval, oldval){
                    if(oldval === newval){
                        return;
                    }

                    $scope.trigger.duration = 0;
                    $scope.stopTime = $scope.trigger.start;
                });

                if ($scope.trigger.id !== undefined) {
                    $scope.measure = 'duration';
                    $scope.stopTime = $scope.trigger.start + $scope.trigger.duration;
                }

                $scope.tagOptions = {
                    'multiple': true,
                    'simple_tags': true,
                    'tags': ['racism', 'sexual violence', 'rape', 'misogyny', 'domestic abuse'],
                };

                var handleError = function(error) {
                    ngToast.warning(error);
                };

                $scope.addTrigger = function(trigger) {

                    if ($scope.measure === 'stoptime') {
                        console.log('');
                    }

                    if (trigger.episode === undefined) {
                        var sentTrigger = angular.copy(trigger);

                        sentTrigger.show = $scope.show.tvShow.id;
                        sentTrigger.showName = $scope.show.tvShow.name;
                        sentTrigger.episode = $scope.episode.id;
                        sentTrigger.episodeName = $scope.episode.name;

                        triggers.addTrigger(sentTrigger).then(function() {
                            ngToast.success('trigger added');
                            $state.go('episodes.detail.page');
                        }, function(error) {
                            console.log(error);
                            handleError(error.data.message);
                        });
                    } else {
                        triggers.updateTrigger(trigger).then(function() {
                            $state.go('episodes.detail.page');
                        });
                    }
                };

                $scope.removeTrigger = function(trigger) {
                    triggers.removeTrigger(trigger).then(function() {
                        ngToast.success('trigger removed');
                        $state.go('episodes.detail.page');
                    });
                };
            }
        ]);

    return angular;
})();
