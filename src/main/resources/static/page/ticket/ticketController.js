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
			if ($scope.typeTicket === 'Projet') {
				$scope.ticket.typeTicket=$scope.typeTicket;
				var idu = Number($scope.ticket.projet.idbd);
				angular.forEach($scope.projets, function(pr) {
					if (pr.idbd===idu) {
						$scope.ticket.idTicket=pr.idProjet+"T00"+$scope.tickets.length;
					}
				});
			}
			if ($scope.typeTicket === 'Evenement') {
				$scope.ticket.typeTicket=$scope.typeTicket;
				var idu = Number($scope.ticket.idEvenement.idEvenement);
				angular.forEach($scope.events, function(ev) {
					if (ev.idEvenement===idu) {
						$scope.ticket.idTicket=ev.idEvent+"T00"+$scope.tickets.length;
					}
				});
			}
			if ($scope.typeTicket === 'Tache') {
				$scope.ticket.typeTicket=$scope.typeTicket;
				var idu = Number($scope.ticket.tache.idBd);
				angular.forEach($scope.taches, function(ev) {
					if (ev.idBd===idu) {
						$scope.ticket.idTicket=ev.idTache+"T00"+$scope.tickets.length;
					}
				});
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