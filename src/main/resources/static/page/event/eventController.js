/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('eventController', eventController);
	eventController.$inject = [ '$scope', '$state', '$rootScope',
			'eventService', 'projetService', 'phaseService', '$log',
			'tacheService', 'userService' ];

	function eventController($scope, $state, $rootScope, eventService,
			projetService, phaseService, $log, tacheService, userService) {
		$scope.$log = $log;
		
		
		$scope.selectedUser = false;
		$scope.maxIngD = false;
		$scope.maxTechD = false;
		$scope.users = userService.query();
		
	
		eventService.progressionEvent({id:1});
		
		$scope.checked = false;
		$scope.tache={
				id : null,
				statut : {
					id : null
				},
				event :{
					idEvent : null,
					idPhase:{
						
					}
				}
		};
		
		
		$scope.event = {
			idEvenement : null,
			idPhase : {
				idphas : null
			}
		};
		$scope.selected = {};
		$scope.selectedPhase = {};
		$scope.events = eventService.query();
		$scope.phases = null;
		$scope.projetsRecherche=projetService.query();
		$scope.phase = {};
		$scope.projets = projetService.query();

		
		
		$scope.selectProjetRecherche = function() {
			$scope.phasesRecherhe=phaseService.getByIdProjet({
				id : $scope.idProjetRecherche
			});
		}
		$scope.selectAllPhase = function() {
			console.log($scope.selected);
			$scope.phases = phaseService.getByIdProjet({
				id : $scope.selected
			});
		};
		$scope.change = function() {
			var dateFin = new Date($scope.evenement.dateFin);
			var dateDebut = new Date($scope.evenement.dateDebut);
			if (dateDebut > dateFin) {
				$scope.isTrue = true;
			} else {
				$scope.isTrue = false;
			}
		};
		
		$scope.change2 = function() {
			var dateFin = new Date($scope.tache.event.dateFin);
			var dateDebut = new Date($scope.tache.event.dateDebut);
			if (dateDebut > dateFin) {
				$scope.isTrue = true;
			} else {
				$scope.isTrue = false;
			}
		};
		$scope.selectPhase = function() {
			var idp = Number($scope.selectedPhase);
			angular.forEach($scope.phases, function(ph) {
				if (ph.idphas === idp) {
					$scope.phase = ph;
					$scope.phase.nbrEvent = $scope.phase.nbrEvent + 1;
					var nbr = $scope.phase.nbrEvent;
					if (nbr < 10) {
						$scope.phase.nbrEvent = "0" + $scope.phase.nbrEvent;
					}
					var phaseChar = "";
					if ($scope.phase.phase == "EXE")
						phaseChar = "E";
					if ($scope.phase.phase == "PRE")
						phaseChar = "P";
					if ($scope.phase.phase == "DCE")
						phaseChar = "D";
					if ($scope.phase.phase == "DIAG")
						phaseChar = "DI";
					$scope.event.idEvent = $scope.phase.projet.idProjet
							+ phaseChar + "x" + $scope.phase.nbrEvent;
				}
			});
		};
		
		$scope.selectPhase2 = function() {
			var idp = Number($scope.selectedPhase);
			angular.forEach($scope.phases, function(ph) {
				if (ph.idphas === idp) {
					$scope.phase = ph;
					$scope.phase.nbrEvent = $scope.phase.nbrEvent + 1;
					var nbr = $scope.phase.nbrEvent;
					if (nbr < 10) {
						$scope.phase.nbrEvent = "0" + $scope.phase.nbrEvent;
					}
					var phaseChar = "";
					if ($scope.phase.phase == "EXE")
						phaseChar = "E";
					if ($scope.phase.phase == "PRE")
						phaseChar = "P";
					if ($scope.phase.phase == "DCE")
						phaseChar = "D";
					if ($scope.phase.phase == "DIAG")
						phaseChar = "DI";
					$scope.tache.event.idEvent = $scope.phase.projet.idProjet
							+ phaseChar + "x" + $scope.phase.nbrEvent;
					$scope.tache.idTache=$scope.phase.projet.idProjet
					+ phaseChar + "x" + $scope.phase.nbrEvent+"T01";
				}
			});
		};
		
		
		
		
		$scope.saveEvenement = function() {

			
			
			$scope.evenement.delaiHjIngCumul=0;
			$scope.evenement.delaiHjTechCumul=0;
			$scope.evenement.nbTaches=1;
			
			$scope.evenement.idPhase = $scope.phase;
			console.log($scope.evenement);
			eventService.save($scope.evenement);

			phaseService.save($scope.phase);
			$state.go('event');
		};
		$scope.saveTache = function() {

			$scope.tache.event.delaiHjIngCumul=0;
			$scope.tache.event.delaiHjTechCumul=0;
			$scope.tache.event.nbTaches=2;
			$scope.tache.event.idPhase = $scope.phase;
			$scope.tache.statut.id = 1;
			tacheService.save($scope.tache);
			
			phaseService.save($scope.phase);
			
			$state.go('event');
		

		}
				

		$scope.retour = function() {

			$state.go('event');
		};

		/*
		 * 
		 * form tache
		 */

		$scope.taches = tacheService.query();
		$scope.selectedUser = false;
		$scope.maxIngD = false;
		$scope.maxTechD = false;
	
		$scope.selectOperateur = function selectOperateur() {
			$scope.selectedUser = true;
			$scope.user = userService.get({
				id : $scope.tache.operateur.id
			});
		};

		

	
		$scope.nombreHTech = function() {

			if ($scope.tache.hjTech + $scope.event.delaiHjTechCumul > $scope.event.delaiHjTech)
				$scope.maxTechD = true;
			if ($scope.tache.hjTech + $scope.event.delaiHjTechCumul <= $scope.event.delaiHjTech)
				$scope.maxTechD = false;
		}
		$scope.nombreHIng = function() {

			if ($scope.tache.hjIng + $scope.event.delaiHjIngCumul > $scope.event.delaiHjIng)
				$scope.maxIngD = true;
			if ($scope.tache.hjIng + $scope.event.delaiHjIngCumul <= $scope.event.delaiHjIng)
				$scope.maxIngD = false;

		}
		
		$scope.progressionTotal = function(id) {

			return eventService.progressionEvent({id:id});
		}
		
	}
})();