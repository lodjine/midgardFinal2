var midgApp = angular.module('midgApp');

var phaseCtrl=midgApp.controller('phaseCtrl', function($scope,$window,phaseService,projetService,$rootScope,userService,statutService) {
	 
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});
	$scope.projets=projetService.query();
	$scope.phases=phaseService.query();
	
	$scope.usersRecherche=userService.query();
	$scope.statutRecherche=statutService.query();
	
	
	

	
	});