(function() {
    'use strict';

    angular.module('triggerWarningsApp.shows')
        .controller('ShowsCtrl', [
            '$scope', '$state', 'tvdb', '$stateParams',
            function($scope, $state, tvdb) {
                $scope.show = tvdb.show;

                $scope.$watch('selectedShow',
                    function(newValue, oldValue) {
                        if (newValue !== undefined && newValue.id !== undefined) {
                            if (oldValue !== newValue) {
                                $state.go('shows.detail.page', {
                                    showId: newValue.id
                                });
                            }
                        }
                    });


                $scope.$watch('selectedEpisode',
                    function(newValue, oldValue) {
                        if (newValue !== undefined) {
                            if (oldValue !== newValue) {
                                $state.go('episodes.detail.page', {
                                    episodeId: newValue
                                });
                            }
                        }
                    });

                var findShow = function(queryParams) {
                    var name = queryParams.data.q;
                    if (name !== '') {
                        tvdb.findShow(name).then(queryParams.success);
                    }
                };

                $scope.showListOptions = {
                    minimumInputLength: 1,
                    initSelection: function(element, callback) {
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
            }
        ]);

    return angular;
})();
