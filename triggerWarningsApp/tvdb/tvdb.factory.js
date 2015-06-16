(function() {
    'use strict';
    angular.module('triggerWarningsApp.tvdb')
        .factory('tvdb', [
            'Restangular',
            function(Restangular) {
                var o = {
                    showList: [],
                    show: {},
                    episode: {}
                };

                var andGetEpisode;

                o.findShow = function(name) {
                    return Restangular.all('tvdb')
                        .all('shows').getList({
                            name: name
                        }).then(function(data) {
                            o.showList = data;
                        });
                };

                o.getShow = function(id) {
                    if (o.show.tvShow === undefined) {
                        return Restangular.all('tvdb')
                            .one('shows', id).get()
                            .then(function(data) {
                                o.show = data;
                                if(andGetEpisode !== null){
                                    console.log('andGetEpisode', andGetEpisode);
                                    return o.setEpisode(andGetEpisode);
                                }
                            });
                    }
                };

                o.setEpisode = function(id) {
                    console.log('o.show', o.show);
                    if (o.show.tvShow === undefined) {
                        andGetEpisode = id;
                        return true;
                    }

                    var i = 0;
                    while (o.show.episodes[i].id !== id) {
                        i++;
                    }

                    o.episode = o.show.episodes[i];
                    console.log('o.episode', o.episode);
                    return true;
                };

                return o;
            }
        ]);

    return angular;
})();
