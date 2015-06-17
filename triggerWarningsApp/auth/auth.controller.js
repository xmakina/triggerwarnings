(function() {
    'use strict';
    angular.module('triggerWarningsApp.auth').controller('AuthCtrl', ['$scope', '$state', 'auth', '$rootScope',
        function($scope, $state, auth, $rootScope) {
            $scope.user = {};

            var goToPreviousState = function() {
                if ($rootScope.previousState !== undefined) {
                    $state.go($rootScope.previousState, $rootScope.previousParams);
                } else {
                    $state.go('dashboard');
                }
            };

            $scope.register = function() {
                auth.register($scope.user).error(function(error) {
                    $scope.error = error;
                }).then(function() {
                    goToPreviousState();
                });
            };

            $scope.logIn = function() {
                auth.logIn($scope.user).error(function(error) {
                    $scope.error = error;
                }).then(function() {
                    goToPreviousState();
                });
            };
        }
    ]);

    return angular;
})();
