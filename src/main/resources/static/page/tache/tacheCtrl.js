(function() {
	'use strict';

	angular.module('midgApp').controller('tacheCtrl', tacheCtrl);

	tacheCtrl.$inject = [ '$scope', '$window', 'tacheService', 'userService',
			'eventService', '$q', '$state' ];

	function tacheCtrl($scope, $window, tacheService, userService,
			eventService, $q, $state) {

		$scope.taches = tacheService.query();
		$scope.users = userService.query();
		$scope.selectedUser = false;
		$scope.maxIngD = false;
		$scope.maxTechD = false;
		$scope.tache = {
			id : null,
			statut : {
				id : null
			}
		}
		$scope.events = eventService.query();
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
			
			$scope.event.delaiHjIngCumul=eventService.getHeurIngCumul({
				id : $scope.tache.event.idEvenement
			});
			$scope.event.delaiHjTechCumul=eventService.getHeurTechCumul({
				id : $scope.tache.event.idEvenement
			});
			
			$scope.event.delaiHjIng=eventService.getHeurIng({
				id : $scope.tache.event.idEvenement
			});
			
			$scope.event.delaiHjTech=eventService.getHeurTech({
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
			$scope.event.delaiHjTechCumul=$scope.event.delaiHjTechCumul+$scope.tache.hjTech;
			$scope.event.delaiHjIngCumul=$scope.event.delaiHjIngCumul+$scope.tache.hjIng;
			eventService.save($scope.event);

		}
		$scope.nombreHTech = function() {
		
			if ($scope.tache.hjTech +$scope.event.delaiHjTechCumul > $scope.event.delaiHjTech)
				$scope.maxTechD = true;
			if ($scope.tache.hjTech + $scope.event.delaiHjTechCumul <= $scope.event.delaiHjTech)
				$scope.maxTechD = false;
		}
		$scope.nombreHIng = function() {
			
				if ($scope.tache.hjIng +$scope.event.delaiHjIngCumul > $scope.event.delaiHjIng)
					$scope.maxIngD = true;
				if ($scope.tache.hjIng+ $scope.event.delaiHjIngCumul <= $scope.event.delaiHjIng)
					$scope.maxIngD = false;
		

		}
	}
})();