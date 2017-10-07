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
		$scope.showTache = true;
		$scope.showevent = false;
		$scope.checked = false;
		$scope.evenement = {
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
					$scope.evenement.idEvent = $scope.phase.projet.idProjet
							+ phaseChar + "x" + $scope.phase.nbrEvent;
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
		$scope.detailEvenement = function(checked) {
			if (checked) {
				$scope.showTache = false;
				$scope.showevent = true;
				$scope.selectedUser = false;
				$scope.maxIngD = false;
				$scope.maxTechD = false;
				$scope.users = userService.query();
			} else {
				$scope.showTache = true;
				$scope.showevent = false;
				$scope.selectedUser = true;
				$scope.maxIngD = true;
				$scope.maxTechD = true;
			}

		};
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
		$scope.tache = {
			id : null,
			statut : {
				id : null
			}
		}
		$scope.selectOperateur = function selectOperateur() {
			$scope.selectedUser = true;
			$scope.user = userService.get({
				id : $scope.tache.operateur.id
			});
		};

		$scope.selectEvent = function() {
			$scope.event = eventService.get({
				id : $scope.tache.event.idEvenement
			});

			$scope.event.delaiHjIngCumul = eventService.getHeurIngCumul({
				id : $scope.tache.event.idEvenement
			});
			$scope.event.delaiHjTechCumul = eventService.getHeurTechCumul({
				id : $scope.tache.event.idEvenement
			});

			$scope.event.delaiHjIng = eventService.getHeurIng({
				id : $scope.tache.event.idEvenement
			});

			$scope.event.delaiHjTech = eventService.getHeurTech({
				id : $scope.tache.event.idEvenement
			});
			$scope.tachesLies = tacheService.getByIdEvent({
				id : $scope.tache.event.idEvenement
			});
		};

		$scope.saveTache = function() {
			$scope.tache.idTache = $scope.event.idEvent + 'T'
					+ $scope.event.nbTaches;
			$scope.tache.statut.id = 1;
			tacheService.save($scope.tache);
			$scope.event.nbTaches = $scope.event.nbTaches + 1;
			$scope.event.delaiHjTechCumul = $scope.event.delaiHjTechCumul
					+ $scope.tache.hjTech;
			$scope.event.delaiHjIngCumul = $scope.event.delaiHjIngCumul
					+ $scope.tache.hjIng;
			eventService.save($scope.event);

		}
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