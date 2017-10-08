angular.module('midgApp').controller('detailTacheCtrl', detailTacheCtrl);

detailTacheCtrl.$inject = [ '$scope','userService' ,'tacheService','statutService' ,'eventService', '$window', '$state', '$stateParams' ];

function detailTacheCtrl($scope,userService,tacheService,statutService,eventService, $window,$state, $stateParams) {

	$scope.flagModif=true;
	$scope.users=userService.query();
	$scope.statuts=statutService.query();
	var idTache=$stateParams.id;
	if(idTache != null){
		$scope.tache= tacheService.get({id:idTache});
	
	}
	
	
	$scope.activerModification=function(){
		$scope.flagModif=false;
	}
	
	$scope.nombreHTech = function() {
		
		if ($scope.tache.hjTech +$scope.tache.event.delaiHjTechCumul > $scope.tache.event.delaiHjTech)
			$scope.maxTechD = true;
		if ($scope.tache.hjTech + $scope.tache.event.delaiHjTechCumul <= $scope.tache.event.delaiHjTech)
			$scope.maxTechD = false;
	}
	$scope.nombreHIng = function() {
		
			if ($scope.tache.hjIng +$scope.tache.event.delaiHjIngCumul > $scope.tache.event.delaiHjIng)
				$scope.maxIngD = true;
			if ($scope.tache.hjIng+ $scope.tache.event.delaiHjIngCumul <= $scope.tache.event.delaiHjIng)
				$scope.maxIngD = false;
	

	}
	$scope.selectOperateur = function selectOperateur() {
		$scope.selectedUser = true;
		$scope.tache.operateur = userService.get({
			id : $scope.tache.operateur.id
		});
	};
	
	
	
	
	$scope.saveTache = function() {

		if($scope.tache.operateur.ingenieur)
			$scope.tache.hjTech=0;
		if(!$scope.tache.operateur.ingenieur)
			$scope.tache.hjIng=0;
		tacheService.save($scope.tache);
		$scope.tache.event.delaiHjTechCumul=$scope.tache.event.delaiHjTechCumul+$scope.tache.hjTech;
		$scope.tache.event.delaiHjIngCumul=$scope.tache.event.delaiHjIngCumul+$scope.tache.hjIng;
		eventService.save($scope.tache.event);
		eventService.progressionEvent({id:$scope.tache.event.idEvenement});
		$state.go('listTache');
	

	}
	
};


	
	
	
