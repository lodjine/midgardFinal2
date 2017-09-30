var midgApp = angular.module('midgApp');

var phaseCtrl=midgApp.controller('phaseCtrl', function($scope,$window,phaseService,projetService) {
	 
	
	$scope.projets=projetService.query();
	$scope.phases=phaseService.query();
	

    
    
	
	});