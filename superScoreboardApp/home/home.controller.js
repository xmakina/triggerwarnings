angular.module('superScoreboardApp.home').controller('HomeCtrl', ['$scope', 'auth', '$state','Restangular',
    function($scope, auth, $state, restangular) {
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.logOut = auth.logOut;
		$scope.players = [];

        restangular.all('users').getList().then(function(data) {
            $scope.players = data;
        });
    }
]);
