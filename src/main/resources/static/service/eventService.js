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

		});

	}
})();
