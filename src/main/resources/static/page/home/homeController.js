/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';

	angular.module('midgApp').controller('homeController', homeController);
	homeController.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService'];

	function homeController($scope, $state, $rootScope, userService,$q,roleService) {
		var login = localStorage.getItem("login"); 
		$rootScope.userConect=userService.userByLogin({login:login});
	}
})();