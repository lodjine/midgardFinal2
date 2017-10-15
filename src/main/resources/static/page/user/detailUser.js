/**
 * 
 */
angular.module('midgApp').controller('detailUser', detailUser);

detailUser.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService','$stateParams'];

function detailUser($scope, $state, $rootScope, userService,$q,roleService,$stateParams) {

	$scope.roles=roleService.query().$promise.then(function (data) {
		console.log(data);
		console.log(angular.fromJson(data));
		$scope.roles=angular.fromJson(data);
	  });
	var iduser=$stateParams.id;
	if(iduser != null){
		$scope.user= userService.get({id:iduser}).$promise.then(function (data) {
			$scope.user=angular.fromJson(data);
			$scope.selected=$scope.user.role;
		  });
		
	}
	$scope.saveuser = function() {
		userService.save($scope.user);
		$scope.user={id:null,role : {}};
		$state.go('listUser');
	};	
};


	
	
	
