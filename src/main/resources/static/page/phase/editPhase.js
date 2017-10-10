angular.module('midgApp').controller('editPhase', editPhase);

editPhase.$inject = [ '$scope', '$state', '$rootScope', 'eventService',
		'projetService', 'phaseService', '$stateParams','userService','statutService' ];

function editPhase($scope, $state, $rootScope, eventService,
		projetService, phaseService, $stateParams,userService,statutService) {
	
      $scope.flagModif=true;
      $scope.statuts=statutService.query();
	$scope.activerModification=function(){
		$scope.flagModif=false;
	}
	var idPhase = $stateParams.id;
	$scope.isTrue = false;
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});
	if (idPhase != null) {

		$scope.phase = phaseService.get({
			id : idPhase
		});

	}
	$scope.change = function() {
		var dateFin = new Date($scope.phase.dateFin);
		var dateDebut = new Date($scope.phase.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue = true;
		} else {
			$scope.isTrue = false;
		}
	};
	$scope.Remove = function(index) {
		$scope.phase.docs.splice(index, 1);
	}
	
	$scope.updatePhase=function() {
		phaseService.save($scope.phase).$promise.then(function(){
			$state.go('listPhase');
			
        })
	}
	
	$scope.Add = function() {
		// Add the new item to the Array.
		var document = {};
		document.typeDoc = $scope.typeDoc;
		document.etatDoc = $scope.etatDoc;
		$scope.phase.docs.push(document);
		$scope.typeDoc = "";
		$scope.etatDoc = "";
	};
	
};

