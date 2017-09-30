/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('detailEvent', detailEvent);
	detailEvent.$inject = [ '$scope', '$state', '$rootScope',
			'eventService', 'projetService', 'phaseService', '$stateParams' ];

	function detailEvent($scope, $state, $rootScope, eventService,
			projetService, phaseService, $stateParams) {
		var idEvent=$stateParams.id;
		if(idEvent != null){
			$scope.evenement= eventService.get({id:idEvent});
			$scope.phases = phaseService.query();
			$scope.projets = projetService.query();
		}
		$scope.retour = function() {
		
			$state.go('event');
		};
		$scope.saveEvenement = function() {
			eventService.save($scope.evenement);
			phaseService.save($scope.phase);
			$state.go('event');
		};
	}
})();