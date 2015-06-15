(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', ['$scope', 'auth', '$state', 'tvdb',
        function($scope, auth, $state, tvdb) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.logOut = auth.logOut;
            $scope.trigger = {};
            $scope.showList = tvdb.showList;

            var findShow = function(queryParams) {
                var name = queryParams.data.q;
                if (name !== '') {
                    return tvdb.findShow(name).then(queryParams.success);
                } else {
                    console.log('failed');
                }
            };

            $scope.showListOptions = {
                minimumInputLength: 1,
                initSelection: function(element, callback) {
                    var id = $(element).val();

                    if (tvdb.showList === undefined) {
                        findShow(function() {
                            if (id !== "") {
                                var searchResult = $.grep(tvdb.showList, function(e) {
                                    return e.id === id;
                                });

                                callback(searchResult[0]);
                            }
                        });
                    } else {
                        if (id !== "") {
                            var result = $.grep(tvdb.showList, function(e) {
                                return e.id === id;
                            });

                            callback(result[0]);
                        }
                    }
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
