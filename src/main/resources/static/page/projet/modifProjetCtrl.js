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
	
	}
	$scope.Remove = function(index) {
		$scope.phase.docs.splice(index, 1);
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
		$scope.phaseValidator();
		if(!$scope.showErreur){
		if(!$scope.phase.projet.dateProjetMoe)
			$scope.phase.projet.dateProjetMoe=new Date();
		if ($scope.phase.chefProjet==null || $scope.phase.chefProjet.id == null) {
			$scope.phase.projet.chefProjet={};
			$scope.phase.chefProjet={};
			$scope.phase.projet.chefProjet.id = Number($scope.chefP);
			$scope.phase.chefProjet.id = Number($scope.chefP);
		}
		$scope.phase.statut=$scope.projet.statut
		phaseService.save($scope.phase).$promise.then(function() {});
		projetService.save($scope.phase.projet).$promise.then(function() {
			$state.go('projet');
		});
		$scope.flagModif = true;
		}
	}

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
		}
			if(!$scope.phase.projet.nomProjet ||$scope.phase.projet.nomProjet==null ||$scope.phase.projet.nomProjet==''){
				$scope.messageErreur.push("\r\n * nom du projet obligatoire");
			}
			if( !$scope.phase.dateDebut ||  !$scope.phase.dateSoldePhase)
				$scope.messageErreur.push("\r\n * date début/solde phase obligatoire");
			else
				$scope.change2(false);
			if(!$scope.phase.phase||!$scope.phase.phase==null|| $scope.phase.phase==''){
				$scope.messageErreur.push("\r\n * phase obligatoire");
			}
			if($scope.phase.chefProjet.id ==null || $scope.phase.chefProjet.id ==''){
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
		if(!$scope.phase.dateSoldePhase){
			$scope.phase.dateSoldePhase=new Date($scope.phase.dateDebut);
			$scope.phase.dateSoldePhase.setDate($scope.phase.dateSoldePhase.getDay() + 14);
		}
		var dateFin = new Date($scope.phase.dateSoldePhase);
		var dateDebut = new Date($scope.phase.dateDebut);
		var dateDebutProjet = new Date(
				$scope.phase.projet.dateDebut);
		var dateFinProjet = new Date(
				$scope.phase.projet.dateFin);
		dateFin.setHours(0,0,0,0);
		dateDebut.setHours(0,0,0,0);
		dateDebutProjet.setHours(0,0,0,0);
		dateFinProjet.setHours(0,0,0,0);
		if (dateDebut &&dateFin&& dateDebut > dateFin) {
			$scope.messageErreur.push("\r\n * Date début de la phase est antérieure à la date de fin");
			$scope.isTrue2 = true;
		} else {
			$scope.isTrue2 = false;
		}
		if ((dateDebut &&dateFin&& dateFinProjet && dateDebutProjet)&& (dateFin < dateDebutProjet
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
	

};