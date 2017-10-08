


(function() {
	'use strict';
	angular.module('midgApp').factory('statutService', statutService);

	statutService.$inject = [ '$resource' ];

	function statutService($resource) {

		var resourceUrl = '/statut/:id';
		return $resource(resourceUrl, {}, {
			
			
			
		});

	}
})();
