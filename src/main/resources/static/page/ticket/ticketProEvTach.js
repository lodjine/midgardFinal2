(function() {
	'use strict';

	angular.module('midgApp').controller('ticketProEvTach', ticketProEvTach);
	ticketProEvTach.$inject = [ '$scope', '$state', '$rootScope',
			'ticketService', 'tacheService', 'projetService', 'eventService',
			'userService', '$stateParams' ];

	function ticketProEvTach($scope, $state, $rootScope, ticketService,
			tacheService, projetService, eventService, userService,
			$stateParams) {
		var login = localStorage.getItem("login");
		$rootScope.userConect = userService.userByLogin({
			login : login
		});
		$scope.ticket = {};
		$scope.tickets = ticketService.query();
		$scope.users = userService.query();
		var idProjet = $stateParams.id;
		if (idProjet != null) {
			var ss = idProjet.split("/");
			$scope.ticket.typeTicket = ss[1];
			$scope.id = ss[0];

			if ($scope.ticket.typeTicket === 'Projet') {
				$scope.showprojet = true;
				$scope.showevent = false;
				$scope.showtache = false;
				$scope.ticket.projet = projetService.get({
					id : $scope.id
				}).$promise.then(function(result) {
					$scope.ticket.projet = result;
					$scope.ticket.typeTicket = 'Projet';
					$scope.ticket.idTicket = $scope.ticket.projet + "T00"
							+ $scope.tickets.length;
				});

			}
			if ($scope.ticket.typeTicket === 'Evenement') {

				$scope.showprojet = false;
				$scope.showevent = true;
				$scope.showtache = false;
				$scope.ticket.evenement = eventService.get({
					id : $scope.id
				}).$promise.then(function(result) {
					$scope.ticket.evenement = angular.fromJson(result);
					$scope.ticket.idTicket = $scope.ticket.evenement + "T00"
							+ $scope.tickets.length;

				});

			}
			if ($scope.ticket.typeTicket === 'Tache') {
				$scope.showprojet = false;
				$scope.showevent = false;
				$scope.showtache = true;
				$scope.ticket.tache = tacheService.get({
					id : $scope.id
				}).$promise.then(function(result) {
					$scope.ticket.tache = angular.fromJson(result);
					$scope.ticket.idTicket = $scope.ticket.tache + "T00"
							+ $scope.tickets.length;

				});
			}

		}
		$scope.selectUser = function(id) {
			var idu = Number(id);
			angular.forEach($scope.users, function(user) {
				if (user.id === idu) {
					$scope.ticket.destinataire.push(user);
				}
			});
		};
		$scope.saveTicket = function() {
			if ($scope.ticket.typeTicket === 'Projet') {

				$scope.ticket.idTicket = $scope.ticket.projet.idProjet + "T00"
						+ $scope.tickets.length;

			}
			if ($scope.ticket.typeTicket === 'Evenement') {

				$scope.ticket.idTicket = $scope.ticket.evenement.idEvent + "T00"
						+ $scope.tickets.length;

			}
			if ($scope.ticket.typeTicket === 'Tache') {

				$scope.ticket.idTicket = $scope.ticket.tache.idTache + "T00"
						+ $scope.tickets.length;

			}
			ticketService.save($scope.ticket);
		};
		$scope.retour = function() {
			$state.go('listticket');
		};
	}
})();