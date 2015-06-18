(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth', '$state', 'triggers',
        function($scope, auth, $state, triggers) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.logOut = auth.logOut;

            $scope.latest = triggers.latest;
            $scope.goal = triggers.goal;

            $scope.goHome = function(){
            	$state.go('dashboard.page');
            };
        }
    ]);
})();
