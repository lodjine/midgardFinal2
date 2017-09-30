var midgApp = angular.module('midgApp');

var userCtrl=midgApp.controller('userCtrl', function($scope,$window,userService) {
	 
	
	$scope.users=userService.query();
	
	

    
    
	
	});