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
			'eventService', 'projetService', 'phaseService', '$stateParams' ,'userService','statutService'];

	function detailEvent($scope, $state, $rootScope, eventService,
			projetService, phaseService, $stateParams,userService,statutService) {
		
		

	      $scope.flagModif=true;
		
		$scope.activerModification=function(){
			$scope.flagModif=false;
		}
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login}).$promise.then(function (data) {
			$rootScope.userConect=angular.fromJson(data);
		  });
		
		var idEvent=$stateParams.id;
		
		$scope.statuts = statutService.query();
		if(idEvent != null){
			$scope.evenement= eventService.get({id:idEvent}).$promise.then(function (data) {
				$scope.evenement=angular.fromJson(data);
				$scope.oldHjIng=$scope.evenement.delaiHjIng;
				$scope.oldHjTech=$scope.evenement.delaiHjTech;
				$scope.showArchi=$scope.evenement.idPhase.archi;
				$scope.showGrosOeuvre=$scope.evenement.idPhase.grosOeuvre;
				$scope.showMetal=$scope.evenement.idPhase.metal;
				$scope.showBois=$scope.evenement.idPhase.bois;
				$scope.showVoirie=$scope.evenement.idPhase.voirie;
			  });
			$scope.phases = phaseService.query().$promise.then(function (data) {
				$scope.phases=angular.fromJson(data);
			  });
			$scope.projets = projetService.query().$promise.then(function (data) {
				$scope.projets=angular.fromJson(data);
			  });
		}
		$scope.retour = function() {
		
			$state.go('event');
		};
		
		function isNumeric(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}
		
		function validateCumulHour(){
			if($scope.phase){
				var maxIngPhase=Number($scope.phase.delaiHjIng);
				var maxTechPhase=Number($scope.phase.delaiHjTech);
				var cumulIngPhase=Number($scope.phase.delaiHjIngCumul);
				var cumulTechPhase=Number($scope.phase.delaiHjTechCumul);
				var hIngEvent=Number($scope.evenement.delaiHjIng)-Number($scope.oldHjIng);
				var hTechEvent=Number($scope.evenement.delaiHjTech)-Number($scope.oldHjTech);
				
				if(cumulIngPhase+hIngEvent>maxIngPhase){
					var reste=maxIngPhase-cumulIngPhase;
					$scope.messageErreur.push("\r\n * max heures ingenieur depassé (reste "+reste+" )");
				}
				if(cumulTechPhase+hTechEvent>maxTechPhase){
					var reste=maxTechPhase-cumulTechPhase;
					$scope.messageErreur.push("\r\n * max heures technicien depassé (reste "+reste+" )");
				}
				
			}
		}
		
		
		
		
		$scope.change = function(onchange) {
			if(onchange){
				$scope.messageErreur=[];
				$scope.showErreur=false;
			}
			if($scope.evenement.idPhase.dateSoldePhase){
				var dateFinPhase = new Date($scope.evenement.idPhase.dateSoldePhase);
				dateFinPhase.setHours(0,0,0,0);
			}	
			if($scope.evenement.idPhase.dateDebut){
				var dateDebutPhase = new Date($scope.evenement.idPhase.dateDebut);
				dateDebutPhase.setHours(0,0,0,0);
			}
			if($scope.evenement.dateDebut){
				var dateDebut = new Date(
						$scope.evenement.dateDebut);
				dateDebut.setHours(0,0,0,0);
			}
			if($scope.evenement.echeance){
				var dateFin = new Date(
						$scope.evenement.echeance);
				dateFin.setHours(0,0,0,0);
			}
			if (dateDebut && dateFin && dateDebut > dateFin) {
				$scope.messageErreur.push("\r\n * Date début de l'événement est antérieure à la date de fin");
				$scope.isTrue = true;
			} else {
				$scope.isTrue = false;
			}
			if ((dateDebut && dateFin && dateFinPhase && dateDebutPhase) && (dateFin < dateDebutPhase
					|| dateFin > dateFinPhase
					|| dateDebut > dateFinPhase
					|| dateDebut < dateDebutPhase)) {
				$scope.isTrue = true;
				$scope.messageErreur.push("\r\n * dates événement incohérentes avec dates phase");
			} else {
				$scope.isTrue = false;
			}
			if($scope.messageErreur.length==0){
				$scope.showErreur=false;
				
			}
			else{
				$scope.showErreur=true;
			}

		};
		
		
$scope.eventValidator= function (){
			
			$scope.messageErreur=[];
			$scope.showErreur=false;				
			// validation du event
			
			if(!isNumeric($scope.evenement.statut.id)){
				$scope.messageErreur.push("\r\n * statut obligatoire");
			}
			
			if(!isNumeric($scope.evenement.priorite)){
				$scope.messageErreur.push("\r\n * priorité obligatoire (1 à 10)");
			}
			
			if(! $scope.evenement.dateDebut || ! $scope.evenement.echeance)
				$scope.messageErreur.push("\r\n * date début/échance événement obligatoire");
			else
				$scope.change(false);
			if(!isNumeric($scope.evenement.delaiHjIng)||!isNumeric($scope.evenement.delaiHjTech)){
				$scope.messageErreur.push("\r\n * quantification obligatoire");
			}
			
			
			if (!($scope.evenement.idPhase.archi || $scope.evenement.idPhase.grosOeuvre
					|| $scope.evenement.idPhase.metal || $scope.evenement.idPhase.metal
					|| $scope.evenement.idPhase.bois || $scope.evenement.idPhase.voirie)) {
				$scope.messageErreur.push("\r\n * lot obligatoire");
			}
			validateCumulHour();
				if($scope.messageErreur.length==0){
					$scope.showErreur=false;
				}
				else{
					$scope.showErreur=true;
				}
				
		}
		
$scope.saveEvenement = function() {
	$scope.eventValidator();
	if(!$scope.showErreur){
		$scope.evenement.idPhase.delaiHjIngCumul=Number($scope.evenement.idPhase.delaiHjIngCumul)+(Number($scope.evenement.delaiHjIng)-Number($scope.oldHjIng));
		$scope.evenement.idPhase.delaiHjTechCumul=Number($scope.evenement.idPhase.delaiHjTechCumul)+(Number($scope.evenement.delaiHjTech)-Number($scope.oldHjTech));
		
	eventService.save($scope.evenement).$promise.then(function(data) {
		eventService.saveHist({
			id : $scope.evenement.idEvenement
		});
	});
	phaseService.save($scope.evenement.idPhase);
	
	$state.go('event');
	}
};
	}
})();