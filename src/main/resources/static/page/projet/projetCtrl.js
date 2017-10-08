var midgApp = angular.module('midgApp');

var projetCtrl = midgApp.controller('projetCtrl', function($scope, $window,$state,
		projetService, entrepriseService, phaseService, documentService,$rootScope,userService) {
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});
	$scope.phase = {
		id : null,
		docs : []
	};
	
	$scope.phase2 = {
			idPhase : null,
			phase : null,
			projet : {
				idProjet : null
			}
		};
	$scope.phase3 = {
			idPhase : null,
			phase : null,
			projet : {
				idProjet : null
			}
		};
	$scope.phase4 = {
			idPhase : null,
			phase : null,
			projet : {
				idProjet : null
			}
		};
	
	$scope.phase.docs = [ {
		"typeDoc" : 'CCTP'
	}, {
		"typeDoc" : 'Rapport Géo'
	}, {
		"typeDoc" : 'Plan architecture'
	}, {
		"typeDoc" : 'Plans DCE'
	}, {
		"typeDoc" : 'Plans charpente'
	}, {
		"typeDoc" : 'Avis CT'
	} ];

	$scope.projets = projetService.query();

	$scope.entreprises = entrepriseService.query();
	$scope.Add = function() {
		// Add the new item to the Array.
		var document = {};
		document.typeDoc = $scope.typeDoc;
		document.etatDoc = $scope.etatDoc;
		$scope.phase.docs.push(document);
		$scope.typeDoc = "";
		$scope.etatDoc = "";
	};

	$scope.Remove = function(index) {
		$scope.phase.docs.splice(index, 1);
	}

	$scope.saveProjet = function() {
		phaseService.save($scope.phase);
		if ($scope.phase.phase == "EXE"){
		
			$scope.phase2.idPhase=$scope.phase.projet.idProjet+"P";
			$scope.phase2.projet.idProjet=$scope.phase.projet.idProjet;
			$scope.phase2.phase="PRE"
			phaseService.savePhaseAux($scope.phase2);
			
			$scope.phase3.idPhase=$scope.phase.projet.idProjet+"D";
			$scope.phase3.phase="DCE"
			$scope.phase3.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase3);
			
			$scope.phase4.idPhase=$scope.phase.projet.idProjet+"Di";
			$scope.phase4.phase="DIAG"
			$scope.phase4.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase4);
		}
		if ($scope.phase.phase == "PRE"){
			
			$scope.phase2.idPhase=$scope.phase.projet.idProjet+"E";
			$scope.phase2.phase="EXE"
			$scope.phase2.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase2);
			
			$scope.phase3.idPhase=$scope.phase.projet.idProjet+"D";
			$scope.phase3.phase="DCE"
			$scope.phase3.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase3);
			
			$scope.phase4.idPhase=$scope.phase.projet.idProjet+"Di";
			$scope.phase4.phase="DIAG"
			$scope.phase4.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase4);
		}
		if ($scope.phase.phase == "DCE"){
			
			$scope.phase2.idPhase=$scope.phase.projet.idProjet+"E";
			$scope.phase2.phase="EXE"
			$scope.phase2.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase2);
			
			$scope.phase3.idPhase=$scope.phase.projet.idProjet+"P";
			$scope.phase3.phase="PRE"
			$scope.phase3.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase3);
			
			$scope.phase4.idPhase=$scope.phase.projet.idProjet+"Di";
			$scope.phase4.phase="DIAG"
			$scope.phase4.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase4);
		}
		if ($scope.phase.phase == "DIAG"){
			
			$scope.phase2.idPhase=$scope.phase.projet.idProjet+"E";
			$scope.phase2.phase="EXE"
			$scope.phase2.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase2);
			
			$scope.phase3.idPhase=$scope.phase.projet.idProjet+"P";
			$scope.phase3.phase="PRE"
			$scope.phase3.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase3);
			
			$scope.phase4.idPhase=$scope.phase.projet.idProjet+"D";
			$scope.phase4.phase="DCE"
			$scope.phase4.projet.idProjet=$scope.phase.projet.idProjet;
			phaseService.savePhaseAux($scope.phase4);
		}
		console.log($scope.phase);
		
		$state.go('projet');

	};

	$scope.createIdPhase = function() {
		var phaseChar = "";
		if ($scope.phase.phase == "EXE")
			phaseChar = "E";
		if ($scope.phase.phase == "PRE")
			phaseChar = "P";
		if ($scope.phase.phase == "DCE")
			phaseChar = "D";
		if ($scope.phase.phase == "DIAG")
			phaseChar = "DI";
		$scope.phase.idPhase = $scope.phase.projet.idProjet + phaseChar;

	};

	$scope.change = function() {
		var dateFin = new Date($scope.phase.projet.dateFin);
		var dateDebut = new Date($scope.phase.projet.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue = true;
		} else {
			$scope.isTrue = false;
		}
	};
	$scope.change2 = function() {
		var dateFin = new Date($scope.phase.dateFin);
		var dateDebut = new Date($scope.phase.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue2 = true;
		} else {
			$scope.isTrue2 = false;
		}
	};
});