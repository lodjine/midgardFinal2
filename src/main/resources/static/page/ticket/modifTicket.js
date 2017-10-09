/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';

	angular.module('midgApp').controller('modifTicket', modifTicket);
	modifTicket.$inject = [ '$scope', '$state', '$rootScope',
			'ticketService', 'tacheService', 'projetService', 'eventService',
			'userService' ,'$stateParams'];

	function modifTicket($scope, $state, $rootScope, ticketService,
			tacheService, projetService, eventService, userService,$stateParams) {
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
		
		$scope.userList=[];
		var idTicket=$stateParams.id;
		if(idTicket != null){
			$scope.ticket= ticketService.get({id:idTicket}).$promise.then(function(result) {
				$scope.ticket = result;
	          })
	          .then(function() {
	        	  if ($scope.ticket.typeTicket === 'Projet') {
	  				$scope.showprojet = false;
	  				$scope.showevent = false;
	  				$scope.showtache = false;
	  			}
	  			if ($scope.ticket.typeTicket === 'Evenement') {
	  				$scope.showprojet = true;
	  				$scope.showevent = true;
	  				$scope.showtache = false;
	  			}
	  			if ($scope.ticket.typeTicket === 'Tache') {
	  				$scope.showprojet = true;
	  				$scope.showevent = true;
	  				$scope.showtache = true;
	  			}
	          }).then(function() {
	        	  $scope.users = userService.query().$promise.then(function(result) {
	        		  $scope.users=result;
		          }).then(function() {
		        	  userList=$scope.ticket.destinataire  ;
		          });
				
	          });

		}
		
		
		
		
		
		
		
		
		
		
		$scope.retour = function() {
			$state.go('listticket');
		};
	}
})();