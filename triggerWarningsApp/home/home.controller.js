(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth', '$state', 'tvdb', 'triggers',
        function($scope, auth, $state, tvdb, triggers) {
            $scope.isLoggedIn = auth.isLoggedIn();
            $scope.logOut = auth.logOut;
            $scope.trigger = {};
            $scope.show = tvdb.show;
            $scope.triggers = triggers.triggerList;

            var findShow = function(queryParams) {
                var name = queryParams.data.q;
                if (name !== '') {
                    tvdb.findShow(name).then(queryParams.success);
                }
            };

            var getShow = function(id) {
                if (id !== undefined) {
                    tvdb.getShow(id).then(function() {
                        $scope.show = tvdb.show;
                    });
                }
            };

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

            $scope.showListOptions = {
                minimumInputLength: 1,
                initSelection: function(element, callback) {
                    getShow($scope.selectedShow);
                    callback();
                },
                ajax: {
                    data: function(term) {
                        return {
                            q: term
                        };
                    },
                    quietMillis: 500,
                    transport: findShow,
                    results: function() {
                        var results = [];
                        $.each(tvdb.showList, function(index, item) {
                            results.push({
                                id: item.id,
                                text: item.name
                            });
                        });
                        return {
                            results: results
                        };
                    }
                },
            };

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

            return angular;
        }
    ]);
})();
