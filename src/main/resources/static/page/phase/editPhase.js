angular.module('midgApp').controller('editPhase', editPhase);

editPhase.$inject = [ '$scope', '$state', '$rootScope', 'eventService',
		'projetService', 'phaseService', '$stateParams' ];

function editPhase($scope, $state, $rootScope, eventService,
		projetService, phaseService, $stateParams) {
	var idPhase = $stateParams.id;
	$scope.isTrue = false;

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

