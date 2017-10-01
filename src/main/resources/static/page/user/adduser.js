/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('adduser', adduser);
	adduser.$inject = [ '$scope', '$state', '$rootScope', 'userService' ];

	function adduser($scope, $state, $rootScope, userService) {
		$scope.users=userService.query();
		$scope.user={};
		$scope.saveUser = function() {
			
		};
	}
})();