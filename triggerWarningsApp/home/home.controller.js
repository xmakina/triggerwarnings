(function() {
    'use strict';
    angular.module('triggerWarningsApp.home').controller('HomeCtrl', [
        '$scope', 'auth',
        function($scope, auth) {
            $scope.isLoggedIn = auth.isLoggedIn();
            $scope.logOut = auth.logOut;
        }
    ]);
})();
