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
    	
    	var resourceUrl =  '/midgard/role/:id';
    	return $resource(resourceUrl, {}, {
    		
    	});
    	
    
        
    }
})();
