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
                    console.log('trigger', trigger);
                    return Restangular.one('episodes', trigger.episode)
                        .all('triggers').post(trigger);
                };

                return o;
            }
        ]);

    return angular;
})();
