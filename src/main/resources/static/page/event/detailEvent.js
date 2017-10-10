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
			'eventService', 'projetService', 'phaseService', '$stateParams' ,'userService'];

	function detailEvent($scope, $state, $rootScope, eventService,
			projetService, phaseService, $stateParams,userService) {
		
		

	      $scope.flagModif=true;
		
		$scope.activerModification=function(){
			$scope.flagModif=false;
		}
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
		
		var idEvent=$stateParams.id;
		if(idEvent != null){
			$scope.evenement= eventService.get({id:idEvent});
			$scope.phases = phaseService.query();
			$scope.projets = projetService.query();
		}
		$scope.retour = function() {
		
			$state.go('event');
		};
		$scope.saveEvenement = function() {
			eventService.save($scope.evenement);
			phaseService.save($scope.phase);
			$state.go('event');
		};
	}
})();