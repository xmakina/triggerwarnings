(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth', '$state', 'tvdb', 'triggers',
        function($scope, auth, $state, tvdb, triggers) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.logOut = auth.logOut;
            $scope.trigger = {};
            $scope.show = tvdb.show;

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
                    getShow($scope.trigger.show);
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
                'tags': ['tag1', 'tag2', 'tag3', 'tag4'], // Can be empty list                
            };

            $scope.addTrigger = function() {
                triggers.addTrigger($scope.trigger);
            };

        }
    ]);

    return angular;
})();
