(function() {
	'use strict';
	angular.module('midgApp').factory('projetService', projetService);

	projetService.$inject = [ '$resource' ];

	function projetService($resource) {

		var resourceUrl = '/midgard/projet/:id';
		return $resource(resourceUrl, {}, {
			
			
			
		});

	}
})();
