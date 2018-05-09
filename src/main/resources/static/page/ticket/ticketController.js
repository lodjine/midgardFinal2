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
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
		$scope.tickets = ticketService.query();
		$scope.taches = [];
		$scope.projets = projetService.query().$promise.then(function(data) {
			$scope.projets = angular.fromJson(data);
			$scope.projets=  $scope.groupByProjet($scope.projets);
		});
		$scope.events = [];
		$scope.listSelectedDesti = [];
		$scope.users = userService.query();
		$scope.typeIsSelected = false;
		$scope.typeTicket = {};
		$scope.ticket = {iddbTicket : null,
				destinataire : [],
		         statut:{}};
		$scope.showprojet = false;
		$scope.showevent = false;
		$scope.showtache = false;
		$scope.selectType = function(typeTicket) {
			if (typeTicket === 'Projet') {
				$scope.showprojet = false;
				$scope.showevent = false;
				$scope.showtache = false;
				$scope.typeIsSelected = true;
			}
			if (typeTicket === 'Evenement') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = false;
				$scope.typeIsSelected = true;
			}
			if (typeTicket === 'Tache') {
				$scope.showprojet = true;
				$scope.showevent = true;
				$scope.showtache = true;
				$scope.typeIsSelected = true;
			}
			if (!(typeTicket === 'Tache' || typeTicket === 'Projet' || typeTicket === 'Evenement')) {

				$scope.typeIsSelected = false;
			}
		};
		
		
		$scope.groupByProjet = function() {
			var codesProjet = {};
			for (var i = 0; i < $scope.projets.length; i++) {
				var codeProjet = $scope.projets[i].idProjet;
		  if (!codesProjet[codeProjet]) {
			  codesProjet[codeProjet] = [];
		  }
		  codesProjet[codeProjet].push($scope.projets[i].idProjet);
		}
		const  myArray = new Set();
		let arrayResponse = [];
		for (var codeProjet in codesProjet) {
		  myArray.add(codeProjet);
		}
		myArray.forEach(v => arrayResponse.push(v));
		return arrayResponse;
		}
		$scope.saveTicket = function() {
			
			 validateTicket();
			 if(!$scope.showErreurTicket){
				angular.forEach($scope.users, function(user) {
					angular.forEach($scope.listSelectedDesti, function(selectedId) {
						if (Number(selectedId) === user.id) {
							$scope.ticket.destinataire.push(user);
						}
					});
					
			});			
			if ($scope.typeTicket === 'Projet') {
				$scope.ticket.typeTicket=$scope.typeTicket;
				angular.forEach($scope.projets, function(pr) {
					if (pr===$scope.ticket.projet.idProjet) {
						$scope.ticket.idTicket=pr+"T00"+$scope.tickets.length;
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
			$scope.ticket.statut.id=1;
			ticketService.save($scope.ticket).$promise.then(function() {
				$scope.retour();
			});
			
			
		}
		};
		$scope.selectEvent = function() {
			$scope.events  = eventService.getEventByProjet({
				id : $scope.ticket.projet.idProjet
			});
		};
		$scope.selectTache = function() {
			$scope.taches  = tacheService.getByIdEvent({
				id : $scope.ticket.idEvenement.idEvenement
			});
		};
		
		$scope.retour = function() {
			$state.go('listticket');
		};
		
		function isNumeric(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}
		function validateTicket(){ 
			$scope.messageErreurTicket=[];
			$scope.showErreurTicket=false;
			
			
			if(!$scope.typeIsSelected){
				$scope.messageErreurTicket.push("\r\n * type de ticket obligatoire");
			}else{
				
				if(!$scope.ticket.projet||!isNumeric($scope.ticket.projet.idProjet)){
					$scope.messageErreurTicket.push("\r\n * projet obligatoire");
				}
				if(($scope.typeTicket=='Evenement' ||$scope.typeTicket=='Tache' )&& (!$scope.ticket.idEvenement||!isNumeric($scope.ticket.idEvenement.idEvenement))){
					$scope.messageErreurTicket.push("\r\n * evenement obligatoire");
				}
				if($scope.typeTicket=='Tache' && (!$scope.ticket.tache || !isNumeric($scope.ticket.tache.idBd))){
					$scope.messageErreurTicket.push("\r\n * tache obligatoire");
				}
			}
			if(!$scope.ticket.emetteur||!isNumeric($scope.ticket.emetteur.id)){
				$scope.messageErreurTicket.push("\r\n * emetteur obligatoire");
			}
			if($scope.listSelectedDesti.length==0){
				$scope.messageErreurTicket.push("\r\n * destinataire obligatoire");
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
           
          
           
           if($scope.messageErreurTicket.length==0){
				$scope.showErreurTicket=false;
			}
			else{
				$scope.showErreurTicket=true;
			}
           			
		}
	}
})();