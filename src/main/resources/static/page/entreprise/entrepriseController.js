/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('entrepriseController',
			entrepriseController);
	entrepriseController.$inject = [ '$scope', '$state', '$rootScope',
			'entrepriseService', '$stateParams' ,'userService'];

	function entrepriseController($scope, $state, $rootScope,
			entrepriseService, $stateParams,userService) {
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
		$scope.entreprises = entrepriseService.query();
		$scope.entreprise={};
		$scope.save = function() {
			entrepriseService.save($scope.entreprise);
		}
		
		$scope.addEntre = function() {
			$state.go('adntreprise');
		}
	}
})();