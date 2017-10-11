
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('tacheService', tacheService);

    tacheService.$inject = ['$resource'];

    function tacheService ($resource) {
    	
    	var resourceUrl =  '/midgard/tache/:id';
    	return $resource(resourceUrl, {}, {
    		'getByIdEvent': {
                method: 'GET',
                isArray: true,
                url: '/tachesByEvent/:id'
              }
    	});
    	
    
        
    }
})();
