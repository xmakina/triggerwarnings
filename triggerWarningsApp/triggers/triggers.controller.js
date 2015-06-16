(function() {
    'use strict';

    angular.module('triggerWarningsApp.shows')
        .controller('TriggersCtrl', [
            '$scope',
            function($scope) {
                $scope.name = 'trigger controller';
            }
        ]);

    return angular;
})();
