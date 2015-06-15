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
                    return Restangular.all('tvdb')
                        .all('shows').getList({
                            name: name
                        }).then(function(data) {
                            o.showList = data;
                        });
                };

                o.getShow = function(id) {
                    console.log('id', id);
                    return Restangular.all('tvdb')
                    .one('shows', id).get()
                    .then(function(data){
                        o.show = data;
                    });
                };

                return o;
            }
        ]);

    return angular;
})();
