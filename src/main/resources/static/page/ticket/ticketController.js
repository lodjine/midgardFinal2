/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';

	angular.module('midgApp').controller('ticketController', ticketController);
	ticketController.$inject = [ '$scope', '$state', '$rootScope',
			'ticketService', 'tacheService', 'projetService', 'eventService',
			'userService' ];

	function ticketController($scope, $state, $rootScope, ticketService,
			tacheService, projetService, eventService, userService) {
		$scope.tickets = ticketService.query();
		$scope.taches = [];
		$scope.projets = projetService.query();
		$scope.events = [];
		$scope.list = [];
		$scope.users = userService.query();

		$scope.typeTicket = {};
		$scope.ticket = {iddbTicket : null,
				destinataire : []};
		$scope.showprojet = false;
		$scope.showevent = false;
		$scope.showtache = false;
		$scope.selectType = function(typeTicket) {
			if (typeTicket === 'Projet') {
				$scope.showprojet = false;
				$scope.showevent = false;
				$scope.showtache = false;
			}
			if (typeTicket === 'Evenement') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = false;
			}
			if (typeTicket === 'Tache') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = true;
			}
		};
		$scope.selectUser = function(id) {
			var idu = Number(id);
			angular.forEach($scope.users, function(user) {
				if (user.id===idu) {
					$scope.ticket.destinataire.push(user);
				}
			});
		};
		$scope.saveTicket = function() {
			if (typeTicket === 'Projet') {
				$scope.ticket.projet ;
			}
			if (typeTicket === 'Evenement') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = false;
			}
			if (typeTicket === 'Tache') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = true;
			}
			ticketService.save($scope.ticket);
		};
		$scope.selectEvent = function() {
			$scope.events  = eventService.getEventByProjet({
				id : $scope.ticket.projet.idbd
			});
		};
		$scope.selectTache = function() {
			$scope.taches  = tacheService.getByIdEvent({
				id : $scope.ticket.idEvenement.idEvenement
			});
		};
	}
})();