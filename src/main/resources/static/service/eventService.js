/**
 * http://usejsdoc.org/
 */

(function() {
	'use strict';
	angular.module('midgApp').factory('eventService', eventService);

	eventService.$inject = [ '$resource' ];

	function eventService($resource) {

		var resourceUrl = '/evenement/:id';
		return $resource(resourceUrl, {}, {

			'getEventByProjet' : {
				method : 'GET',
				isArray : true,
				url : '/getEventByProjet/:id'
			},
			'getHeurIng' : {
				method : 'GET',
				isArray : false,
				url : '/getHeurIng/:id'
			},
			'getHeurTech' : {
				method : 'GET',
				isArray : false,
				url : '/getHeurTech/:id'
			},
			'getHeurIngCumul' : {
				method : 'GET',
				isArray : false,
				url : '/getHeurIng/:id'
			},
			'getHeurTechCumul' : {
				method : 'GET',
				isArray : false,
				url : '/getHeurTech/:id'
			},
			'progressionEvent' : {
				method : 'GET',
				isArray : false,
				url : '/progressionEvent/:id'
			},
            'saveHist': {
                method: 'GET',
                isArray : false,
                url: '/evenementHisto/:id'
              }

		});

	}
})();
