angular.module('superScoreboardApp.home', []);

angular.module('superScoreboardApp.home').config([
	'$stateProvider',
	function($stateProvider) {
		$stateProvider.state('dashboard', {
			parent: 'root',
			url: '/',
			templateUrl: 'home/partials/dashboard.html',
			controller:'HomeCtrl'
		});
	}
]);