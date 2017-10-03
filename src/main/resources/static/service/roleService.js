/**
 * 
 */
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('roleService', roleService);

    roleService.$inject = ['$resource'];

    function roleService ($resource) {
    	
    	var resourceUrl =  '/role/:id';
    	return $resource(resourceUrl, {}, {
    		
    	});
    	
    
        
    }
})();
