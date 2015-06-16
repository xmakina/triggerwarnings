(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth', '$state', 'tvdb', 'triggers',
        function($scope, auth, $state, tvdb, triggers) {
            
/*
            $scope.isLoggedIn = auth.isLoggedIn();
            $scope.logOut = auth.logOut;
            $scope.trigger = {};
            $scope.show = tvdb.show;
            $scope.triggers = triggers.triggerList;

            $scope.setTrigger = function(trigger) {
                $scope.trigger = trigger;
            };

            $scope.$watch('trigger.episode', function(newVal, oldVal) {
                if (oldVal === newVal) {
                    return;
                }

                triggers.getTriggers(newVal).then(function() {
                    $scope.triggers = triggers.triggerList;
                });
            }, true);

            $scope.tagOptions = {
                'multiple': true,
                'simple_tags': true,
                'tags': [], // Can be empty list                
            };

            $scope.addTrigger = function() {
                if ($scope.trigger.id === undefined) {
                    triggers.addTrigger($scope.trigger).then(function() {
                        $scope.trigger = {
                            episode: $scope.trigger.episode
                        };
                        $scope.triggers = triggers.triggerList;
                    });
                } else {
                    triggers.updateTrigger($scope.trigger).then(function() {
                        $scope.trigger = {
                            episode: $scope.trigger.episode
                        };
                        $scope.triggers = triggers.triggerList;
                    });
                }
            };

            $scope.removeTrigger = function(trigger) {
                triggers.removeTrigger(trigger).then(function() {
                    $scope.trigger = {
                        episode: $scope.trigger.episode
                    };
                    $scope.triggers = triggers.triggerList;
                });
            };
            */
        }
    ]);
})();
