
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('tacheService', tacheService);

    tacheService.$inject = ['$resource'];

    function tacheService ($resource) {
    	
    	var resourceUrl =  '/tache/:id';
    	return $resource(resourceUrl, {}, {
    		'getByIdEvent': {
                method: 'GET',
                isArray: true,
                url: '/tachesByEvent/:id'
              },
              'saveHist': {
                  method: 'GET',
                  url: '/tacheHisto/:id'
                }
    	});
    	
    
        
    }
})();
