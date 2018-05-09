angular.module('midgApp').controller('detailTacheCtrl', detailTacheCtrl);

detailTacheCtrl.$inject = [ '$scope', 'userService', 'tacheService', 'statutService', 'eventService', '$window', '$state', '$stateParams', '$rootScope', 'userService' ];

function detailTacheCtrl($scope, userService, tacheService, statutService, eventService, $window, $state, $stateParams, $rootScope) {
	var login = localStorage.getItem("login");
	$rootScope.userConect = userService.userByLogin({
		login : login
	});


	$scope.flagModif = true;

	$scope.activerModification = function() {
		$scope.flagModif = false;
	}


	$scope.users = userService.query().$promise.then(function(data) {
		$scope.users = angular.fromJson(data);
	});
	$scope.statuts = statutService.query().$promise.then(function(data) {
		$scope.statuts = angular.fromJson(data);
	});
	var idTache = $stateParams.id;
	if (idTache != null) {
		$scope.tache = tacheService.get({
			id : idTache
		}).$promise.then(function(data) {
			$scope.tache = angular.fromJson(data);
			$scope.tachesLies = tacheService.getByIdEvent({
				id : $scope.tache.event.idEvenement
			});
			$scope.tachesToFilter = $scope.tache;
			console.log($scope.tachesToFilter.idTache);
		});

	}


	$scope.activerModification = function() {
		$scope.flagModif = false;
	}

	$scope.nombreHTech = function() {

		if ($scope.tache.hjTech + $scope.tache.event.delaiHjTechCumul > $scope.tache.event.delaiHjTech)
			$scope.maxTechD = true;
		if ($scope.tache.hjTech + $scope.tache.event.delaiHjTechCumul <= $scope.tache.event.delaiHjTech)
			$scope.maxTechD = false;
	}
	$scope.nombreHIng = function() {

		if ($scope.tache.hjIng + $scope.tache.event.delaiHjIngCumul > $scope.tache.event.delaiHjIng)
			$scope.maxIngD = true;
		if ($scope.tache.hjIng + $scope.tache.event.delaiHjIngCumul <= $scope.tache.event.delaiHjIng)
			$scope.maxIngD = false;


	}
	$scope.selectOperateur = function selectOperateur() {
		$scope.selectedUser = true;
		$scope.tache.operateur = userService.get({
			id : $scope.tache.operateur.id
		}).$promise.then(function(data) {
			$scope.tache.operateur = angular.fromJson(data);
		});
	};





	$scope.saveTache = function() {
		
//		$scope.tache.event.delaiHjIngCumul=Number($scope.tache.event.delaiHjIngCumul)+(Number($scope.tache.hjIng)-Number($scope.oldHjIng));
//		$scope.tache.event.delaiHjTechCumul=Number($scope.tache.event.delaiHjTechCumul)+(Number($scope.tache.hjTech)-Number($scope.oldHjTech));

		if ($scope.tache.operateur.ingenieur)
			$scope.tache.hjTech = 0;
		if (!$scope.tache.operateur.ingenieur)
			$scope.tache.hjIng = 0;
		tacheService.save($scope.tache);

		eventService.save($scope.tache.event).$promise.then(function(data) {
			tacheService.saveHist({
				id : $scope.tache.idBd
			});
		});
		eventService.progressionEvent({
			id : $scope.tache.event.idEvenement
		});

		$state.go('listTache');


	}

}
;