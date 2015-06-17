(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth', '$state',
        function($scope, auth, $state) {
            $scope.isLoggedIn = auth.isLoggedIn;
            $scope.logOut = auth.logOut;

            $scope.goHome = function(){
            	$state.go('dashboard');
            };
        }
    ]);
})();
