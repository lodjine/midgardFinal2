angular.module('midgApp').controller('editPhase', editPhase);

editPhase.$inject = [ '$scope', '$state', '$rootScope', 'eventService',
		'projetService', 'phaseService', '$stateParams','userService' ];

function editPhase($scope, $state, $rootScope, eventService,
		projetService, phaseService, $stateParams,userService) {
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
};

