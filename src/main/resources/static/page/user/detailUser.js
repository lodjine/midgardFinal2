/**
 * 
 */
angular.module('midgApp').controller('detailUser', detailUser);

detailUser.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService','$stateParams'];

function detailUser($scope, $state, $rootScope, userService,$q,roleService,$stateParams) {

	$scope.roles=roleService.query();
	var iduser=$stateParams.id;
	if(iduser != null){
		$scope.user= userService.get({id:iduser});
	}
	
	

	
	
};


	
	
	
