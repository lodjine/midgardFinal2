
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('entrepriseService', entrepriseService);

    entrepriseService.$inject = ['$resource'];

    function entrepriseService ($resource) {
    	
    	var resourceUrl =  '/midgard/entreprise/:id';
    	return $resource(resourceUrl, {}, {

    	});
    	
    
        
    }
})();
