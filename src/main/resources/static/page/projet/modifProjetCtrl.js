angular.module('midgApp').controller('modifProjetCtrl', modifProjetCtrl);

modifProjetCtrl.$inject = [ '$scope', 'entrepriseService', 'projetService', '$window', '$state', '$stateParams', '$rootScope', 'userService', 'statutService', 'phaseService', 'documentService' ];

function modifProjetCtrl($scope, entrepriseService, projetService, $window, $state, $stateParams, $rootScope, userService, statutService, phaseService, documentService) {
	var login = localStorage.getItem("login");
	$scope.isTrue2=false;
	$scope.isTrue=false;
	$rootScope.userConect = userService.userByLogin({
		login : login
	});
	var role = 'CHEFP';
	$scope.usersChef = userService.getChefProjet({
		role : role
	}).$promise.then(function(data) {
		$scope.usersChef = angular.fromJson(data);
	});
	;
	$scope.flagModif = true;
	$scope.statuts = statutService.query();
	$scope.entreprises = entrepriseService.query();
	var idProjet = $stateParams.id;
	var ss = idProjet.split("/");
	$scope.Projet = ss[0];
	$scope.idphase = ss[1];

	if ($scope.Projet != null) {
		$scope.projet = projetService.get({
			id : $scope.Projet
		}).$promise.then(function(data) {
			$scope.projet = angular.fromJson(data);
			$scope.date = $scope.projet.dateDebut;
		});

	}
	$scope.phasesRecherhe = phaseService.getByIdProjet({
		id : ss[0]
	});
	if ($scope.idphase != null) {
		$scope.phase = phaseService.get({
			id : $scope.idphase
		}).$promise.then(function(data) {
			$scope.phase = angular.fromJson(data);
			$scope.phseedit = $scope.phase;
			$scope.chefP = $scope.phase.projet.chefProjet ;
		});
	}
	$scope.Adddoc = function() {
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
	}

	$scope.activerModification = function() {
		$scope.flagModif = false;
	}
	$scope.deleteProjet = function deleteProjet(id) {
		projetService.delete({
			id : id
		});
		$state.go('projet');
	}
	$scope.updateProjet = function updateProjet() {
		if ($scope.phase.chefprojet==null || $scope.phase.chefProjet.id == null) {
	
			$scope.phase.projet.chefProjet.id = Number($scope.chefP);
			$scope.phase.chefProjet.id = Number($scope.chefP);
		}
		phaseService.save($scope.phase).$promise.then(function() {});
		projetService.save($scope.projet).$promise.then(function() {
			$state.go('projet');
		});
		$scope.flagModif = true;
	}

	$scope.change = function() {
		var dateFin = new Date($scope.projet.dateSoldePhase);
		var dateDebut = new Date($scope.projet.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue = true;
		} else {
			$scope.isTrue = false;
		}
	};
	$scope.createIdPhase = function() {
		$scope.phase.idPhas = null;
		$scope.phase.id = null;
		$scope.test = $scope.phase.phase;
		var phaseChar = "";
		if ($scope.phase.phase == "EXE")
			phaseChar = "X";
		if ($scope.phase.phase == "PRE")
			phaseChar = "P";
		if ($scope.phase.phase == "DCE")
			phaseChar = "C";
		if ($scope.phase.phase == "DIAG")
			phaseChar = "D";

		$scope.phase = {
			id : null,
			dateSoldePhase : $scope.dateSoldePhas,
			projet : {
				idProjet : null,
				dateDebut : $scope.date,
				statut : {
					id : null
				},
				chefProjet : {
					id : 	$scope.phase.chefProjet.id
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
		$scope.phase.statut.id = 1;
		$scope.phase.chefProjet.id = $scope.phseedit.chefProjet.id;
		$scope.phase.phase = $scope.test;
		$scope.phase.projet = $scope.phseedit.projet;
		$scope.phase.idPhase = $scope.phseedit.projet.idProjet + phaseChar;
		angular.forEach($scope.phasesRecherhe, function(ph, index) {
			if (ph.phase == $scope.test) {
				$scope.phase={};
				$scope.phase = $scope.phasesRecherhe[index];
			}
		});


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
	
	$scope.change = function() {
		var dateFin = new Date($scope.projet.dateFin);
		var dateDebut = new Date($scope.projet.dateDebut);
		if (dateDebut > dateFin) {
			$scope.isTrue = true;
		} else {
			$scope.isTrue = false;
		}
	};
};