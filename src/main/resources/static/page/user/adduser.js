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
		$scope.user={id:null,role : {}};
		$scope.saveuser = function() {
			var idrole = Number($scope.selected);
			angular.forEach($scope.roles, function(item) {
				if (item.id === idrole) {
					$scope.user.role=item;
				}
			});
			userService.save($scope.user);
			$scope.user={id:null,role : {}};
			$state.go('listUser');
		};
	}
})();