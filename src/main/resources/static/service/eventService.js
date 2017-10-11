/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';
	angular.module('midgApp').factory('eventService', eventService);

	eventService.$inject = [ '$resource' ];

	function eventService($resource) {

		var resourceUrl = '/midgard/evenement/:id';
		return $resource(resourceUrl, {}, {

			'getEventByProjet' : {
				method : 'GET',
				isArray : true,
				url : '/midgard/getEventByProjet/:id'
			},
			'getHeurIng' : {
				method : 'GET',
				isArray : false,
				url : '/midgard/getHeurIng/:id'
			},
			'getHeurTech' : {
				method : 'GET',
				isArray : false,
				url : '/midgard/getHeurTech/:id'
			},
			'getHeurIngCumul' : {
				method : 'GET',
				isArray : false,
				url : '/getHeurIng/:id'
			},
			'getHeurTechCumul' : {
				method : 'GET',
				isArray : false,
				url : '/midgard/getHeurTech/:id'
			},
			'progressionEvent' : {
				method : 'GET',
				isArray : false,
				url : '/midgard/progressionEvent/:id'
			}

		});

	}
})();
