angular.module('midgApp').controller('tacheCtrl', tacheCtrl);

tacheCtrl.$inject = [ '$scope', '$window', 'tacheService', 'userService',
	'eventService', '$state' ,'$rootScope'];

function tacheCtrl($scope, $window, tacheService, userService,
		eventService,  $state,$rootScope) {
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});

	$scope.initFunc = function() {
		$scope.events = eventService.query();
		
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
	}
	
	
	$scope.events = eventService.query();
	
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
		$scope.event.nbTaches = $scope.event.nbTaches + 1;
		$scope.tache.idTache = $scope.event.idEvent + 'T'
				+ $scope.event.nbTaches;
		$scope.tache.statut.id = 1;
	
		
		if($scope.tache.hjTech!='undefined'){
			$scope.tache.event.delaiHjTechCumul=$scope.tache.event.delaiHjTechCumul+$scope.tache.hjTech;
			}
			if($scope.tache.hjIng!='undefined'){
			$scope.tache.event.delaiHjIngCumul=$scope.tache.event.delaiHjIngCumul+$scope.tache.hjIng;
			}
		
		tacheService.save($scope.tache).$promise.then(function(){
			
          })
          .then(function() {
        	  eventService.save($scope.event);
          }).then(function() {
        	  eventService.progressionEvent({id:1});
          }).then(function() {
        	  $state.go('listTache');
          });
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
			if ($scope.tache.hjIng+ $scope.event.delaiHjIngCumul <= $scope.event.delaiHjIng)
				$scope.maxIngD = false;
	

	}
	
	$scope.selectOperateur = function selectOperateur() {
		$scope.selectedUser = true;
		$scope.operateur = userService.get({
			id : $scope.tache.operateur.id});
	
	};
	
};


	
	
	

