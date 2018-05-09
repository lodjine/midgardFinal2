

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
	

	$scope.selectTache=function(){
		if($scope.tache.tacheLie.idBd==0){
			$scope.tache.tacheLie=null;
		}
	};
	
	
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
		
		 testTAche();
		 if(!$scope.showErreurTache){
		$scope.event.nbTaches = $scope.event.nbTaches + 1;
		$scope.tache.idTache = $scope.event.idEvent + 'T'
				+ $scope.event.nbTaches;
		$scope.tache.statut.id = 1;
	
		
		if($scope.tache.hjTech!=undefined){
			$scope.event.delaiHjTechCumul=$scope.event.delaiHjTechCumul+$scope.tache.hjTech;
			}
			if($scope.tache.hjIng!=undefined){
			$scope.event.delaiHjIngCumul=$scope.event.delaiHjIngCumul+$scope.tache.hjIng;
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
	
	$scope.selectOperateur = function selectOperateur() {
		$scope.selectedUser = true;
		$scope.user = $scope.users.find(function(element) {
			  return element.id== $scope.tache.operateur.id;
			});
	};
	
	function isNumeric(n) {
		  return !isNaN(parseFloat(n)) && isFinite(n);
		}
	
	function testTAche(){
		$scope.messageErreurTache=[];
		$scope.showErreurTache=false;
		if(!$scope.tache.event || !$scope.tache.event.idEvenement || $scope.tache.event.idEvenement==''){
			$scope.messageErreurTache.push("\r\n * evenement obligatoire");
		}
		if(!$scope.tache.description || $scope.tache.description =='' )
		{
			$scope.messageErreurTache.push("\r\n * déscription obligatoire");
		}
			if(!$scope.tache.operateur || !$scope.tache.operateur.id || !isNumeric($scope.tache.operateur.id))
				$scope.messageErreurTache.push("\r\n * operateur obligatoire");
			else{
				if($scope.user.ingenieur && !isNumeric($scope.tache.hjIng))
					$scope.messageErreurTache.push("\r\n * heures/j ingénieur obligatoire");
				else if($scope.user.ingenieur && isNumeric($scope.tache.hjIng) && $scope.tache.hjIng > $scope.event.delaiHjIng)
					$scope.messageErreurTache.push("\r\n * max heures ingénieur depassé");
				
				
				if(!$scope.user.ingenieur && !isNumeric($scope.tache.hjTech))
					$scope.messageErreurTache.push("\r\n * heures/j technicien obligatoire");
				else if(!$scope.user.ingenieur && isNumeric($scope.tache.hjTech) && $scope.tache.hjTech > $scope.event.delaiHjTech)
					$scope.messageErreurTache.push("\r\n * max heures technicien depassé");
			}
		
			
			if($scope.messageErreurTache.length==0){
				$scope.showErreurTache=false;
			}
			else{
				$scope.showErreurTache=true;
			}
			$scope.withTache=true;
		
	}
	
};


	
	
	

