/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';

	angular.module('midgApp').controller('modifTicket', modifTicket);
	modifTicket.$inject = [ '$scope', '$state', '$rootScope', 'ticketService',
			'tacheService', 'projetService', 'eventService', 'userService',
			'$stateParams' ];

	function modifTicket($scope, $state, $rootScope, ticketService,
			tacheService, projetService, eventService, userService,
			$stateParams) {

		$scope.usersSelected = [];
		$scope.ticket = {
			destinataire : []
		};

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
			}).$promise.then(function(result) {
				$scope.ticket = result;
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
									$scope.users = result;
								}).then(function() {
							$scope.userList = $scope.ticket.destinataire;
						});

					});

		}

		$scope.saveTicket = function() {
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

				ticketService.save($scope.ticket);
			}).then(function() {

				$state.go('listticket');
			});;

		};

		$scope.retour = function() {
			$state.go('listticket');
		};
	}
})();