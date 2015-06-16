(function() {
    'use strict';
    angular.module('triggerWarningsApp.triggers')
        .factory('triggers', [
            'Restangular',
            function(Restangular) {
                var o = {
                    triggerList: [],
                    trigger: {}
                };

                o.getTriggers = function(id) {
                    return Restangular.one('episodes', id)
                        .all('triggers').getList()
                        .then(function(data) {
                            o.triggerList = data;
                        });
                };

                o.addTrigger = function(trigger) {
                    return Restangular.one('episodes', trigger.episode)
                        .all('triggers').post(trigger).then(function() {
                            return o.getTriggers(trigger.episode);
                        });
                };

                o.updateTrigger = function(trigger) {
                    return trigger.put().then(function() {
                        return o.getTriggers(trigger.episode);
                    });
                };

                o.removeTrigger = function(trigger) {
                    return trigger.remove().then(function() {
                        return o.getTriggers(trigger.episode);
                    });
                };

                return o;
            }
        ]);

    return angular;
})();
