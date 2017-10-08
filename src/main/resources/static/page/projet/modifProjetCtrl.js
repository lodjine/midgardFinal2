angular.module('midgApp').controller('modifProjetCtrl', modifProjetCtrl);

modifProjetCtrl.$inject = [ '$scope','entrepriseService' ,'projetService' , '$window', '$state', '$stateParams','$rootScope' ,'userService'];

function modifProjetCtrl($scope,entrepriseService,projetService, $window,$state, $stateParams,$rootScope,userService) {
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});
	$scope.flagModif=true;
	$scope.entreprises=entrepriseService.query();
	var idProjet=$stateParams.id;
	if(idProjet != null){
		$scope.projet= projetService.get({id:idProjet});
		$scope.date=$scope.projet.dateDebut;
		console.log($scope.projet);
	}
	
	
	$scope.activerModification=function(){
		$scope.flagModif=false;
	}
	$scope.deleteProjet=function deleteProjet(id){
		projetService.delete({id:id});
		$window.location.href = '/blank.html#/listProjets';
	}
	$scope.updateProjet=function updateProjet(){
		projetService.save($scope.projet);
		$scope.flagModif=true;
	}
	
	$scope.change = function() {
		var dateFin = new Date($scope.projet.dateFin);
		var dateDebut = new Date($scope.projet.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue=true;
		}else {
			$scope.isTrue=false;
		}
	};
};


	
	
	
