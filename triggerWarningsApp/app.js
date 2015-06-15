(function() {
    'use strict';
    angular.module('triggerWarningsApp', [
        'ui.router',
        'angular-loading-bar',
        'restangular',
        'ui.select2',
        'angularMoment',
        'triggerWarningsApp.templates',
        'triggerWarningsApp.home',
        'triggerWarningsApp.auth',
        'triggerWarningsApp.tvdb',
        'triggerWarningsApp.triggers'
    ]);

    angular.module('triggerWarningsApp').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('root', {
                url: '',
                abstract: true,
                template: '<div ui-view></div>'
            });
            $urlRouterProvider.otherwise('/');
        }
    ]);

    angular.module('triggerWarningsApp').filter('numberFixedLen', function() {
        return function(n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = '' + num;
            while (num.length < len) {
                num = '0' + num;
            }
            return num;
        };
    });

    angular.module('triggerWarningsApp').directive('lapTimeInput', 
        ['moment', function(moment) {
        var tpl = '<div class="lap_time_input">'+
              '<input ng-model="lapTimeInput" type="hidden" placeholder="00.00">'+
              '<input ng-model="lap_time.minutes" type="number" class="minutes" placeholder="00" min="0" max="15" step="1">'+
              '<span class="lap-time-sep">:</span>'+
              '<input ng-model="lap_time.seconds" type="number" class="seconds" placeholder="00" min="0" max="59" step="1">'+
              '<span class="lap-time-sep">.</span>'+
              '<input ng-model="lap_time.milliseconds" type="number" class="milliseconds" placeholder="000" min="0" max="999" step="1">'+
              '</div>';

        return {
            restrict: 'A',
            template: tpl,
            replace: true,
            scope: {
                lapTimeInput: '='
            },
            link: function(scope, element, attrs) {

                scope.$watch('lapTimeInput', function(newValue) {
                    var duration = moment.duration(newValue, 'seconds');
                    scope.lap_time = {
                        minutes: duration.minutes(),
                        seconds: duration.seconds(),
                        milliseconds: duration.milliseconds()
                    };
                });

                scope.$watchCollection('lap_time', function(newTime, oldTime) {
                    scope.lapTimeInput = moment.duration(newTime, 'seconds').asSeconds();
                });
            }
        };
    }]);

    return angular;
})();
