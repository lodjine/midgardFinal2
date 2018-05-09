var midgApp = angular.module('midgApp');

var projetCtrl = midgApp
		.controller(
				'projetCtrl',
				function($scope, $window, $state, projetService,
						entrepriseService, phaseService, documentService,
						$rootScope, userService, statutService) {
					var login = localStorage.getItem("login");
					$rootScope.userConect = userService.userByLogin({
						login : login
					});
					var role = 'CHEFP';
					$scope.usersChef = userService.getChefProjet({
						role : role
					}).$promise.then(function(data) {
						$scope.usersChef = angular.fromJson(data);
					});
					$scope.lotTest = false;
					$scope.phaseTest = false;
					$scope.date = Date.now();
					var d = new Date($scope.date);
					$scope.maxdate = d.setMonth(d.getMonth() + 2);
					var dt = new Date($scope.date);
					$scope.dateFinPhase = dt.setDate(dt.getDate() + 15);
					$scope.chefP = {};
					$scope.usersRecherche = userService.query();
					$scope.statutRecherche = statutService.query();
					$scope.phase = {
						id : null,
						
						dateDebut :$scope.date,
						dateSoldePhase :  $scope.dateFinPhase,
						projet : {
							idProjet : null,
							dateDebut : $scope.date,
							dateFin : $scope.maxdate,
							statut : {
								id : null
							},
							chefProjet : {
								id : null
							}
						},
						docs : [],
						chefProjet : {
							id : null
						},
						statut : {
							id : null
						},
						delaiHjIngCumul : 0,
						delaiHjTechCumul : 0
						
					};

					$scope.phase.docs = [ {
						"typeDoc" : 'CCTP',
						"etatDoc" : 'Recu'
					}, {
						"typeDoc" : 'Rapport Géotechnique',
						"etatDoc" : 'Recu'
					}, {
						"typeDoc" : 'Plan architecture',
						"etatDoc" : 'Recu'
					}, {
						"typeDoc" : 'Plans DCE',
						"etatDoc" : 'Recu'
					}, {
						"typeDoc" : 'Plans charpente',
						"etatDoc" : 'Recu'
					}, {
						"typeDoc" : 'Avis Controleur Technique',
						"etatDoc" : 'Recu'
					} ];

				
					$scope.projetsToTable=[];
					$scope.projets = projetService.query().$promise
							.then(function(data) {
								$scope.projets =angular.fromJson(data);
								$scope.projets=  $scope.groupByProjet($scope.projets);
								if($scope.projets&&$scope.projets.length>0)
								$scope.phase.projet.idProjet = $scope.projets[$scope.projets.length - 1].idProjet + 1;

							

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
					$scope.phases=[];
					$scope.phases = phaseService.query().$promise
							.then(function(data) {
								$scope.phases = angular.fromJson(data);

								$scope.phasesToTable=$scope.phases;
								$scope.numOfPages();
							});
					$scope.entreprises = entrepriseService.query();
					$scope.Add = function() {
						$scope.documentTest=true;	
						// Add the new item to the Array.
						if($scope.typeDoc&&$scope.etatDoc){
							var document = {};
							document.typeDoc = $scope.typeDoc;
							document.etatDoc = $scope.etatDoc;
							$scope.phase.docs.push(document);
							$scope.typeDoc = "";
							$scope.etatDoc = "";
							$scope.documentTest=false;
						}else{
							$scope.documentTest=true;	
						}
						
					};

					$scope.Remove = function(index) {
						$scope.phase.docs.splice(index, 1);
					}
					
					$scope.phaseValidator= function (){
						
						$scope.messageErreur=[];
						$scope.showErreur=false;				
						// validation du projet
						if(! $scope.phase.projet.dateDebut || ! $scope.phase.projet.dateFin)
							$scope.messageErreur.push("\r\n * date début/fin projet obligatoire");
						else
							$scope.change(false);
						if(!$scope.phase.projet.idProjet ||$scope.phase.projet.idProjet==null ||$scope.phase.projet.idProjet==''){
							$scope.messageErreur.push("\r\n * id du projet obligatoire");
						}else if ($scope.phase.projet.idProjet.toString().length !== 4){
							$scope.messageErreur.push("\r\n * id du projet doit contenir 4 chiffres");
						}
							if(!$scope.phase.projet.nomProjet ||$scope.phase.projet.nomProjet==null ||$scope.phase.projet.nomProjet==''){
								$scope.messageErreur.push("\r\n * nom du projet obligatoire");
							}
							if( $scope.phase.dateDebut==null ||  $scope.phase.dateSoldePhase==null)
								$scope.messageErreur.push("\r\n * date début/solde phase manquantes ou incohérentes avec dates projet ");
							else
								$scope.change2(false);
							if(!$scope.phase.phase||!$scope.phase.phase==null|| $scope.phase.phase==''){
								$scope.messageErreur.push("\r\n * phase obligatoire");
							}
							if(!isNumeric($scope.phase.chefProjet.id) ){
								$scope.messageErreur.push("\r\n * chef projet obligatoire");
							}
							if(!$scope.phase.delaiHjIng||!$scope.phase.delaiHjIng==null||!$scope.phase.delaiHjTech||!$scope.phase.delaiHjTech==null){
								$scope.messageErreur.push("\r\n * quantification obligatoire");
							}
							if (!($scope.phase.archi || $scope.phase.grosOeuvre
									|| $scope.phase.metal || $scope.phase.metal
									|| $scope.phase.bois || $scope.phase.voirie)) {
								$scope.messageErreur.push("\r\n * lot obligatoire");
							}
							
							
							if($scope.messageErreur.length==0){
								$scope.showErreur=false;
							}
							else{
								$scope.showErreur=true;
							}
							
					}
					
					function isNumeric(n) {
						  return !isNaN(parseFloat(n)) && isFinite(n);
						}
					$scope.saveProjet = function() {
						$scope.phase.projet.statut.id = 1;
						$scope.phase.statut.id = 1;
						$scope.phase.projet.chefProjet.id = Number($scope.chefP);
						$scope.phase.chefProjet.id = Number($scope.chefP);
						$scope.phaseValidator();
						if(!$scope.showErreur){
								if (!$scope.phase.projet.dateProjetMoe)
									$scope.phase.projet.dateProjetMoe = new Date();

								phaseService.save($scope.phase).$promise.then(
										function(result) {

										}).then(function() {

									console.log($scope.phase);
									$state.go('projet');

								}).catch((err) => {
									$scope.messageErreur=[];
									$scope.messageErreur.push("* Phase Deja ajouté");
								    $scope.showErreur=true;
								
									});	
						}
					};

					$scope.createIdPhase = function() {
						var phaseChar = "";
						if ($scope.phase.phase == "EXE")
							phaseChar = "X";
						if ($scope.phase.phase == "PRE")
							phaseChar = "P";
						if ($scope.phase.phase == "DCE")
							phaseChar = "C";
						if ($scope.phase.phase == "DIAG")
							phaseChar = "D";
						$scope.phase.idPhase = $scope.phase.projet.idProjet
								+ phaseChar;

					};
					$scope.change = function(onchange) {
						if(onchange){
							$scope.messageErreur=[];
							$scope.showErreur=false;
						}
						var dateFin = new Date($scope.phase.projet.dateFin);
						var dateDebut = new Date($scope.phase.projet.dateDebut);
						if (dateDebut && dateFin && dateDebut > dateFin) {
								$scope.messageErreur.push("\r\n * Date début du projet est antérieure a la date de fin");
							
							$scope.isTrue = true;
						} else{
							$scope.isTrue = false;
						}
						if($scope.messageErreur.length==0){
							$scope.showErreur=false;
						}
						else{
							$scope.showErreur=true;
						}
					};
					$scope.change2 = function(onchange) {
						if(onchange){
							$scope.messageErreur=[];
							$scope.showErreur=false;
						}
						if($scope.phase.dateSoldePhase){
							var dateFin = new Date($scope.phase.dateSoldePhase);
							dateFin.setHours(0,0,0,0);
						}	
						if($scope.phase.dateDebut){
							var dateDebut = new Date($scope.phase.dateDebut);
							dateDebut.setHours(0,0,0,0);
						}
						if($scope.phase.projet.dateDebut){
							var dateDebutProjet = new Date(
									$scope.phase.projet.dateDebut);
							dateDebutProjet.setHours(0,0,0,0);
						}
						if($scope.phase.projet.dateFin){
							var dateFinProjet = new Date(
									$scope.phase.projet.dateFin);
							dateFinProjet.setHours(0,0,0,0);
						}
						if (dateDebut && dateFin && dateDebut > dateFin) {
							$scope.messageErreur.push("\r\n * Date début de la phase est antérieure à la date de fin");
							$scope.isTrue2 = true;
						} else {
							$scope.isTrue2 = false;
						}
						if ((dateDebut && dateFin && dateFinProjet && dateDebutProjet) && (dateFin < dateDebutProjet
								|| dateFin > dateFinProjet
								|| dateDebut > dateFinProjet
								|| dateDebut < dateDebutProjet)) {
							$scope.isTrue2 = true;
							$scope.messageErreur.push("\r\n * dates phase incohérentes avec dates projet");
						} else {
							$scope.isTrue2 = false;
						}
						if($scope.messageErreur.length==0){
							$scope.showErreur=false;
							
						}
						else{
							$scope.showErreur=true;
						}

					};
					
					
					
					
					 $scope.curPage = 1,
					  $scope.itemsPerPage = 5,
					  $scope.maxSize = 5;
					    
					 
					  
					  
					  $scope.numOfPages = function () {
					    return Math.ceil($scope.phases.length / $scope.itemsPerPage);
					    
					  };
					  
					    $scope.$watch('curPage + numPerPage', function() {
					    var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
					    end = begin + $scope.itemsPerPage;
					    
					    $scope.phasesToTable = $scope.phases.slice(begin, end);
					  });
				
				
				});