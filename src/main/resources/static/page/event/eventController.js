/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('eventController', eventController);
	eventController.$inject = [ '$scope', '$state', '$rootScope',
		'eventService', 'projetService', 'phaseService','statutService', '$log',
		'tacheService', 'userService' ];

	function eventController($scope, $state, $rootScope, eventService,
		projetService, phaseService, statutService,$log, tacheService, userService) {
		$scope.$log = $log;
		var login = localStorage.getItem("login");
		$rootScope.userConect = userService.userByLogin({
			login : login
		});
		$scope.usersRecherche = userService.query();
		$scope.statutRecherche = statutService.query();
		$scope.projetsRecherche = projetService.query()
		$scope.selectedUser = false;
		$scope.maxIngD = false;
		$scope.maxTechD = false;
		$scope.users = userService.query();

		 eventService.progressionEvent({id:1});

		$scope.checked = false;
		$scope.tache = {
			id : null,
			statut : {
				id : null
			},
			event : {
				idEvent : null,
				idPhase : {

				},
				statut : {
					id : null
				}
			}
		};

		$scope.event = {
			idEvenement : null,
			idPhase : {
				idphas : null
			},
			statut : {
				id : null
			}
		};
		$scope.selected = {};
		$scope.selectedPhase = {};
		$scope.events = eventService.query().$promise.then(function(data) {
			$scope.events = angular.fromJson(data);
		});
		$scope.phases = null;
		$scope.projetsRecherche = projetService.query().$promise.then(function(data) {
			$scope.projetsRecherche = angular.fromJson(data);
			$scope.projetsRecherche=  $scope.groupByProjet($scope.projetsRecherche);
		});
		$scope.phase = {};
		$scope.projets = projetService.query().$promise.then(function(data) {
			$scope.projets = angular.fromJson(data);
			$scope.projets=  $scope.groupByProjet($scope.projets);
		});
		
		
		
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

	
		$scope.selectAllPhase = function() {
			console.log($scope.selected);
			if ($scope.selected) {
				$scope.phases = phaseService.getByIdProjet({
					id : $scope.selected
				}).$promise.then(function(data) {
					$scope.phases = angular.fromJson(data);
				});;
			}

		};

		$scope.change = function(onchange) {
			if(onchange){
				$scope.messageErreur=[];
				$scope.showErreur=false;
			}
			if($scope.phase.dateSoldePhase){
				var dateFinPhase = new Date($scope.phase.dateSoldePhase);
				dateFinPhase.setHours(0,0,0,0);
			}	
			if($scope.phase.dateDebut){
				var dateDebutPhase = new Date($scope.phase.dateDebut);
				dateDebutPhase.setHours(0,0,0,0);
			}
			if($scope.event.dateDebut){
				var dateDebut = new Date(
						$scope.event.dateDebut);
				dateDebut.setHours(0,0,0,0);
			}
			if($scope.event.echeance){
				var dateFin = new Date(
						$scope.event.dateFin);
				dateFin.setHours(0,0,0,0);
			}
			if (dateDebut && dateFin && dateDebut > dateFin) {
				$scope.messageErreur.push("\r\n * Date début de l'événement est antérieure à la date de fin");
				$scope.isTrue = true;
			} else {
				$scope.isTrue = false;
			}
			if ((dateDebut && dateFin && dateFinPhase && dateDebutPhase) && (dateFin < dateDebutPhase
					|| dateFin > dateFinPhase
					|| dateDebut > dateFinPhase
					|| dateDebut < dateDebutPhase)) {
				$scope.isTrue = true;
				$scope.messageErreur.push("\r\n * dates événement incohérentes avec dates phase");
			} else {
				$scope.isTrue = false;
			}
			if($scope.messageErreur.length==0){
				$scope.showErreur=false;
				
			}
			else{
				$scope.showErreur=true;
			}

		};
		
		
		

	
		$scope.selectPhase = function() {
			var idp = Number($scope.selectedPhase);
			angular.forEach($scope.phases, function(ph) {
				if (ph.idphas === idp) {
					$scope.phase = ph;
					$scope.dateMin = $scope.phase.dateDebut;
					$scope.dateMax = $scope.phase.dateSoldePhase;
					$scope.phase.nbrEvent = $scope.phase.nbrEvent + 1;
					var nbr = $scope.phase.nbrEvent;
					if (nbr < 10) {
						$scope.phase.nbrEvent = "0" + $scope.phase.nbrEvent;
					}
					var phaseChar = "";
					if ($scope.phase.phase == "EXE")
						phaseChar = "X";
					if ($scope.phase.phase == "PRE")
						phaseChar = "P";
					if ($scope.phase.phase == "DCE")
						phaseChar = "C";
					if ($scope.phase.phase == "DIAG")
						phaseChar = "D";
					$scope.event.idEvent = $scope.phase.projet.idProjet
					+ phaseChar + "x" + $scope.phase.nbrEvent;
				}
				$scope.showArchi=$scope.phase.archi;
				$scope.showGrosOeuvre=$scope.phase.grosOeuvre;
				$scope.showMetal=$scope.phase.metal;
				$scope.showBois=$scope.phase.bois;
				$scope.showVoirie=$scope.phase.voirie;
			});
		};

		$scope.selectPhase2 = function() {
			var idp = Number($scope.selectedPhase);
			angular.forEach($scope.phases, function(ph) {
				if (ph.idphas === idp) {
					$scope.phase = ph;
					$scope.dateMin = $scope.phase.dateDebut;
					$scope.dateMax = $scope.phase.dateSoldePhase;
					console.log($scope.dateMax)
					$scope.phase.nbrEvent = $scope.phase.nbrEvent + 1;
					var nbr = $scope.phase.nbrEvent;
					if (nbr < 10) {
						$scope.phase.nbrEvent = "0" + $scope.phase.nbrEvent;
					}
					var phaseChar = "";
					if ($scope.phase.phase == "EXE")
						phaseChar = "X";
					if ($scope.phase.phase == "PRE")
						phaseChar = "P";
					if ($scope.phase.phase == "DCE")
						phaseChar = "C";
					if ($scope.phase.phase == "DIAG")
						phaseChar = "D";
					$scope.tache.event.idEvent = $scope.phase.projet.idProjet
					+ phaseChar + "x" + $scope.phase.nbrEvent;
					$scope.tache.idTache = $scope.phase.projet.idProjet
						+ phaseChar + "x" + $scope.phase.nbrEvent + "T01";
				}
			});
		};
		
		function validateCumulHour(){
			if($scope.phase){
				var maxIngPhase=Number($scope.phase.delaiHjIng);
				var maxTechPhase=Number($scope.phase.delaiHjTech);
				var cumulIngPhase=Number($scope.phase.delaiHjIngCumul);
				var cumulTechPhase=Number($scope.phase.delaiHjTechCumul);
				var hIngEvent=Number($scope.event.delaiHjIng);
				var hTechEvent=Number($scope.event.delaiHjTech);
				
				if(cumulIngPhase+hIngEvent>maxIngPhase){
					var reste=maxIngPhase-cumulIngPhase;
					$scope.messageErreur.push("\r\n * max heures ingenieur depassé (reste "+reste+" )");
				}
				if(cumulTechPhase+hTechEvent>maxTechPhase){
					var reste=maxTechPhase-cumulTechPhase;
					$scope.messageErreur.push("\r\n * max heures technicien depassé (reste "+reste+" )");
				}
				
			}
		}
		$scope.saveEvenement = function() {
			$scope.eventValidator();
			testTAche();
			if(!$scope.showErreur){
			$scope.event.delaiHjIngCumul = 0;
			$scope.event.delaiHjTechCumul = 0;
			$scope.event.nbTaches = 0;
			$scope.event.etatAvancement = 0;
			$scope.event.statut.id = 1;
			$scope.event.idPhase = $scope.phase;
			
			
			if(!$scope.withTache){
				$scope.phase.delaiHjIngCumul=Number($scope.phase.delaiHjIngCumul)+Number($scope.event.delaiHjIng);
				$scope.phase.delaiHjTechCumul=Number($scope.phase.delaiHjTechCumul)+Number($scope.event.delaiHjTech);
				eventService.save($scope.event).$promise.then(function() {
					$scope.phase.statut.id=2;
					phaseService.save($scope.phase);
					$state.go('event');
			
			
			});
			}
			else if(!$scope.showErreurTache){
				$scope.phase.delaiHjIngCumul=Number($scope.phase.delaiHjIngCumul)+Number($scope.event.delaiHjIng);
				$scope.phase.delaiHjTechCumul=Number($scope.phase.delaiHjTechCumul)+Number($scope.event.delaiHjTech);
				$scope.event.nbTaches = 1;
				$scope.tache.event=$scope.event;
				$scope.tache.statut.id = 1;
				$scope.phase.statut.id=2;
				$scope.tache.idTache = $scope.event.idEvent + 'T'
				+ $scope.event.nbTaches;
				tacheService.save($scope.tache).$promise.then(function() {
					$state.go('event');
	
	

				});		
				}
					
			}
		};


		$scope.retour = function() {

			$state.go('event');
		};

		/*
		 * 
		 * form tache
		 */

		$scope.taches = tacheService.query();
		$scope.selectedUser = false;
		$scope.maxIngD = false;
		$scope.maxTechD = false;

		$scope.selectOperateur = function selectOperateur() {
			$scope.selectedUser = true;
			$scope.user = $scope.users.find(function(element) {
				  return element.id== $scope.tache.operateur.id;
				});
		};

		$scope.nombreHTech = function() {

			if ($scope.tache.hjTech + $scope.event.delaiHjTechCumul > $scope.event.delaiHjTech)
				$scope.maxTechD = true;
			if ($scope.tache.hjTech + $scope.event.delaiHjTechCumul <= $scope.event.delaiHjTech)
				$scope.maxTechD = false;
		}
		$scope.nombreHIng = function() {

			if ($scope.tache.hjIng + $scope.event.delaiHjIngCumul > $scope.event.delaiHjIng)
				$scope.maxIngD = true;
			if ($scope.tache.hjIng + $scope.event.delaiHjIngCumul <= $scope.event.delaiHjIng)
				$scope.maxIngD = false;

		}

		$scope.progressionTotal = function(id) {
			if (id !=='') {
				return eventService.progressionEvent({
					id : id
				});
			} else {

			}
			return null;

		}
		
		function isNumeric(n) {
			  return !isNaN(parseFloat(n)) && isFinite(n);
			}
		$scope.eventValidator= function (){
			
			$scope.messageErreur=[];
			$scope.showErreur=false;				
			// validation du event
			
			if(!isNumeric($scope.selected)){
				$scope.messageErreur.push("\r\n * projet obligatoire");
			}
			
			if(!isNumeric($scope.selectedPhase)){
				$scope.messageErreur.push("\r\n * phase obligatoire");
			}
			
			
			if(! $scope.event.dateDebut || ! $scope.event.echeance)
				$scope.messageErreur.push("\r\n * date début/échance événement obligatoire");
			else
				$scope.change(false);
			if(!$scope.event.delaiHjIng||!$scope.event.delaiHjIng==null||!$scope.event.delaiHjTech||!$scope.event.delaiHjTech==null){
				$scope.messageErreur.push("\r\n * quantification obligatoire");
			}
			
			if (!($scope.phase.archi || $scope.phase.grosOeuvre
					|| $scope.phase.metal || $scope.phase.metal
					|| $scope.phase.bois || $scope.phase.voirie)) {
				$scope.messageErreur.push("\r\n * lot obligatoire");
			}
			validateCumulHour();
				if($scope.messageErreur.length==0){
					$scope.showErreur=false;
				}
				else{
					$scope.showErreur=true;
				}
				
		}
		function formatDate(date) {
		  var monthNames = [
		    "Janvier", "Février", "Mars",
		    "Avril", "Mai", "Juin", "Juillet",
		    "Aout", "Septembre", "Octobre",
		    "Novembre", "Decembre"
		  ];

		  var day = date.getDate();
		  var monthIndex = date.getMonth();
		  var year = date.getFullYear();

		  return day + ' ' + monthNames[monthIndex] + ' ' + year;
		}
		 
		
		function testTAche(){
			$scope.messageErreurTache=[];
			$scope.showErreurTache=false;
			if($scope.tache.description && $scope.tache.description !='' )// si
																			// description
																			// donc
																			// les
																			// données
																			// de
																			// la
																			// tache
																			// sont
																			// obligatoire
			{
				if(!$scope.tache.operateur || !$scope.tache.operateur.id || !isNumeric($scope.tache.operateur.id))
					$scope.messageErreurTache.push("\r\n * operateur obligatoire");
				else{
					if($scope.user.ingenieur && !isNumeric($scope.tache.hjIng))
						$scope.messageErreurTache.push("\r\n * heures/j ingénieur obligatoire");
					else if($scope.user.ingenieur && isNumeric($scope.tache.hjIng) && $scope.tache.hjIng > $scope.event.delaiHjIng)
						$scope.messageErreurTache.push("\r\n * max heures ingénieur depassé");
					
					
					if(!$scope.user.ingenieur && !isNumeric($scope.tache.hjTech))
						$scope.messageErreurTache.push("\r\n * heures/j technicien obligatoire");
					else if(!$scope.user.ingenieur && isNumeric($scope.tache.hjTech) && $scope.tache.hjTech > $scope.event.delaiHjTech)
						$scope.messageErreurTache.push("\r\n * max heures technicien depassé");
				}
			
				
				if($scope.messageErreurTache.length==0){
					$scope.showErreurTache=false;
				}
				else{
					$scope.showErreurTache=true;
				}
				$scope.withTache=true;
			}
		}
		
	


	}
})();