/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('adduser', adduser);
	adduser.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService'];

	function adduser($scope, $state, $rootScope, userService,$q,roleService) {
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
		$scope.users=userService.query();
		$scope.roles=roleService.query();
		$scope.selected={};
		$scope.users.$promise.then(function (result) {
			$scope.users=userService.query();
			  });
		$scope.user={id:null,role : {id:null}};
		$scope.saveuser = function() {
			
			
			userService.save($scope.user).$promise.then(function() {
				$scope.user={id:null,role : {id:null}};
				$state.go('listUser');
			});
			
		};
	}
})();