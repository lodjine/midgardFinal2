var midgApp = angular.module('midgApp');

var tacheCtrl = midgApp.controller('tacheCtrl', function($scope, $window,
		tacheService,userService,eventService) {
	$scope.taches=tacheService.query();
	$scope.users=userService.query();
	$scope.selectedUser=false;
	$scope.tache={
			id:null,
			statut:{id:null}
	}
	$scope.events=eventService.query();
	$scope.selectOperateur=function selectOperateur(){
		$scope.selectedUser=true;
		$scope.user=userService.get({id:$scope.tache.operateur.id});
	};
	
	$scope.selectEvent=function(){
		$scope.event=eventService.get({id:$scope.tache.event.idEvenement});
		
		
		$scope.tachesLies=tacheService.getByIdEvent({id:$scope.tache.event.idEvenement});
	};
	
	$scope.saveTache=function(){
		$scope.tache.idTache=$scope.event.idEvent+'T'+$scope.event.nbTaches;
		$scope.tache.statut.id=1;
		tacheService.save($scope.tache);
		$scope.event.nbTaches=$scope.event.nbTaches+1;
		eventService.save($scope.event);
		
	}
	
});