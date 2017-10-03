/**
 * http://usejsdoc.org/
 */
(function() {
	'use strict';

	angular.module('midgApp').controller('adduser', adduser);
	adduser.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService'];

	function adduser($scope, $state, $rootScope, userService,$q,roleService) {
		$scope.users=userService.query();
		$scope.roles=roleService.query();
		$scope.selected={};
		$scope.users.$promise.then(function (result) {
			$scope.users=userService.query();
			  });
		$scope.user={id:null,roles : []};
		$scope.saveuser = function() {
			angular.forEach($scope.roles, function(item) {
				var idrole = Number($scope.selected);
				if (item.id === idrole) {
					$scope.user.roles.push(item);
				}
			});
			userService.save($scope.user);
			$scope.user={id:null,roles : []};
			$state.go('listUser');
		};
	}
})();