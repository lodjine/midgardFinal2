/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';

	angular.module('midgApp').controller('modifTicket', modifTicket);
	modifTicket.$inject = [ '$scope', '$state', '$rootScope', 'ticketService',
			'tacheService', 'projetService', 'eventService', 'userService',
			'$stateParams' , 'statutService'];

	function modifTicket($scope, $state, $rootScope, ticketService,
			tacheService, projetService, eventService, userService,
			$stateParams,statutService) {

		$scope.usersSelected = [];
		$scope.ticket = {
			destinataire : []
		};
		$scope.statuts = statutService.query();
		var login = localStorage.getItem("login");
		$rootScope.userConect = userService.userByLogin({
			login : login
		});
		$scope.flagModif = true;

		$scope.activerModification = function() {
			$scope.flagModif = false;
		}
		$scope.userList = [];
		var idTicket = $stateParams.id;
		if (idTicket != null) {
			$scope.ticket = ticketService.get({
				id : idTicket
			}).$promise.then(function(data) {
				$scope.ticket = angular.fromJson(data);
			}).then(function() {
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
			}).then(
					function() {
						$scope.users = userService.query().$promise.then(
								function(result) {
									$scope.users = angular.fromJson(result);
								}).then(function() {
							$scope.userList = $scope.ticket.destinataire;
							console.log($scope.ticket);
						});

					});

		}

		$scope.saveTicket = function() {
			 validateTicket();
			 if(!$scope.showErreurTicket){
			ticketService.deleteTacheDestByTicketId({
				id : $scope.ticket.iddbTicket
			}).$promise.then(
					function(result) {
						$scope.ticket.destinataire = [];
						angular.forEach($scope.users, function(user) {

							angular.forEach($scope.userList2, function(
									selectedId) {
								if (Number(selectedId) === user.id) {
									$scope.ticket.destinataire.push(user);
								}
							});

						});
					}).then(function() {

				ticketService.save($scope.ticket).$promise.then(function(data) {
					ticketService.saveHist({
						id : $scope.ticket.iddbTicket
					});
					$state.go('listticket');
				});
			
			});	
			 }
		};
		
		
		function isNumeric(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}
		function validateTicket(){ 
			$scope.messageErreurTicket=[];
			$scope.showErreurTicket=false;
			
			
		
			if(!$scope.ticket.emetteur||!isNumeric($scope.ticket.emetteur.id)){
				$scope.messageErreurTicket.push("\r\n * emetteur obligatoire");
			}
			if($scope.userList2.length==0){
				$scope.userList2=$scope.userList.map(user => user.id);
				if($scope.userList2.length==0){
				$scope.messageErreurTicket.push("\r\n * destinataire obligatoire");
				}
			}
			if(!$scope.ticket.sujet||$scope.ticket.sujet==null||$scope.ticket.sujet==''){
				$scope.messageErreurTicket.push("\r\n * sujet obligatoire");
			}
			
			if(!$scope.ticket.priorite||!isNumeric($scope.ticket.priorite)||$scope.ticket.priorite<0||$scope.ticket.priorite>10){
				$scope.messageErreurTicket.push("\r\n * sujet obligatoire ( de 0 à 10 )");
			}
			
			
         if(!$scope.ticket.dateEchance){
      	   $scope.messageErreurTicket.push("\r\n * date d'echeance obligatoire ");
         }
         
         if(!isNumeric($scope.ticket.statut.id)){
      	   $scope.messageErreurTicket.push("\r\n * etat obligatoire ");
         }
         
         if($scope.messageErreurTicket.length==0){
				$scope.showErreurTicket=false;
			}
			else{
				$scope.showErreurTicket=true;
			}
         			
		}

		$scope.retour = function() {
			$state.go('listticket');
		};
	}
})();