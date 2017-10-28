var midgApp = angular.module('midgApp');

var projetCtrl = midgApp.controller('projetCtrl', function($scope, $window,
	$state, projetService, entrepriseService, phaseService,
	documentService, $rootScope, userService, statutService) {
	var login = localStorage.getItem("login");
	$rootScope.userConect = userService.userByLogin({
		login : login
	});
	var role='CHEFP';
	$scope.usersChef=userService.getChefProjet({role:role}).$promise.then(function(data) {
		$scope.usersChef = angular.fromJson(data);
	});;
	$scope.date = Date.now();
	var d = new Date($scope.date);
	$scope.maxdate = d.setMonth(d.getMonth() + 2);
	var dt = new Date($scope.date);
	$scope.dateSoldePhas=dt.setDate(dt.getDay()+15);
	$scope.chefP={};
	console.log($scope.maxdate)
	$scope.usersRecherche = userService.query();
	$scope.statutRecherche = statutService.query();
	$scope.phase = {
		id : null,
		dateSoldePhase:$scope.dateSoldePhas,
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
		}
	};


	$scope.phase.docs = [ {
		"typeDoc" : 'CCTP',
		"etatDoc" : 'Recu'
	}, {
		"typeDoc" : 'Rapport Géo',
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
		"typeDoc" : 'Avis CT',
		"etatDoc" : 'Recu'
	} ];

	$scope.projets = projetService.query().$promise.then(function(data) {
		$scope.projets = angular.fromJson(data);
		$scope.phase.projet.idProjet = $scope.projets[$scope.projets.length - 1].idProjet + 1;

	});
	;
	$scope.phases = phaseService.query().$promise.then(function(data) {
		$scope.phases = angular.fromJson(data);
	});
	;
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
		$scope.phase.projet.statut.id = 1;
		$scope.phase.statut.id = 1;
		$scope.phase.projet.chefProjet.id = Number($scope.chefP);
		$scope.phase.chefProjet.id = Number($scope.chefP);
		
		phaseService.save($scope.phase).$promise.then(function(result) {

		}).then(function() {

			console.log($scope.phase);
			$state.go('projet');


		});

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
		var dateFin = new Date($scope.phase.dateSoldePhase);
		var dateDebut = new Date($scope.phase.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue2 = true;
		} else {
			$scope.isTrue2 = false;
		}
	};
});