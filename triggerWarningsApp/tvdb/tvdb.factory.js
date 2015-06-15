(function() {
    'use strict';
    angular.module('triggerWarningsApp.tvdb')
        .factory('tvdb', [
            'Restangular',
            function(Restangular) {
                var o = {
                    showList: [],
                    show: {}
                };

                o.findShow = function(name) {
                    return Restangular.all('tvdb').all('shows').getList({
                        name: name
                    }).then(function(data) {
                        o.showList = data;
                    });
                };

                return o;
            }
        ]);

    return angular;
})();
