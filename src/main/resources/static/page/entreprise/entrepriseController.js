/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('entrepriseController',
			entrepriseController);
	entrepriseController.$inject = [ '$scope', '$state', '$rootScope',
			'entrepriseService', '$stateParams' ];

	function entrepriseController($scope, $state, $rootScope,
			entrepriseService, $stateParams) {
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