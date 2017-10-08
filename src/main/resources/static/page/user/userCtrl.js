var midgApp = angular.module('midgApp');

var userCtrl=midgApp.controller('userCtrl', function($rootScope,$scope,$window,userService) {
	 
	var login = localStorage.getItem("login"); 
	$rootScope.userConect=userService.userByLogin({login:login});
	$scope.users=userService.query();
	
	

    
    
	
	});