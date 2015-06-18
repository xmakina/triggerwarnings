(function() {
    'use strict';
    angular.module('triggerWarningsApp.triggers')
        .factory('triggers', [
            'Restangular',
            function(Restangular) {
                var o = {
                    triggerList: [],
                    trigger: {},
                    latest: {},
                    goal: {}
                };

                var andSetTrigger;

                o.getTriggers = function(id) {
                    return Restangular.one('episodes', id)
                        .all('triggers').getList()
                        .then(function(data) {
                            o.triggerList = data;
                            if(andSetTrigger !== undefined){
                                return o.setTrigger(andSetTrigger);
                            }
                        });
                };

                o.setTrigger = function(id) {
                    if (o.triggerList.length === 0) {
                        andSetTrigger = id;
                        return true;
                    }

                    var i = 0;
                    while (o.triggerList[i].id !== id) {
                        i++;
                    }

                    o.trigger = o.triggerList[i];
                    return true;
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

                o.getLatest = function(){
                    return Restangular.all('triggers').one('latest').get().then(function(data){
                        o.latest = data;
                    });
                };

                o.getGoal = function(){
                    return Restangular.all('triggers').one('goal').get().then(function(data){
                        o.goal = data;
                    });
                };

                return o;
            }
        ]);

    return angular;
})();
