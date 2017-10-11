
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('documentService', documentService);

    documentService.$inject = ['$resource'];

    function documentService ($resource) {
    	
    	var resourceUrl =  '/midgard/document/:id';
    	return $resource(resourceUrl, {}, {

    	});
    	
    
        
    }
})();
