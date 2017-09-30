/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('eventController', eventController);
	eventController.$inject = [ '$scope', '$state', '$rootScope',
			'eventService', 'projetService', 'phaseService' , '$log'];

	function eventController($scope, $state, $rootScope, eventService,
			projetService, phaseService, $log) {
		$scope.$log = $log;
		$scope.evenement = {idEvenement:null,idPhase:{idphas:null}};
		$scope.selected = {};
		$scope.selectedPhase = {};
		$scope.events = eventService.query();
		$scope.phases = null;
		$scope.phase = {};
		$scope.projets = projetService.query();
		$scope.selectAllPhase = function() {
			console.log($scope.selected);
			$scope.phases = phaseService.getByIdProjet({
				id : $scope.selected
			});
		};

		$scope.selectPhase = function() {
			var idp = Number($scope.selectedPhase);
			angular.forEach($scope.phases, function(ph) {
				if (ph.idphas === idp) {
					$scope.phase = ph;
					$scope.phase.nbrEvent=$scope.phase.nbrEvent+1;
					var nbr=$scope.phase.nbrEvent;
					if (nbr < 10) {
						$scope.phase.nbrEvent="0"+$scope.phase.nbrEvent;
					}
					$scope.evenement.idEvent=$scope.phase.projet.idProjet+$scope.phase.phase+"x"+$scope.phase.nbrEvent;
				}
			});
		};
		$scope.saveEvenement = function() {
			$scope.evenement.idPhase=$scope.phase;
			console.log($scope.evenement);
			eventService.save($scope.evenement);
			phaseService.save($scope.phase);
			$state.go('event');
		};
		$scope.detailEvenement = function(id) {
			alert(id);
			
		};
	}
})();