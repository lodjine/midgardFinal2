
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('userService', userService);

    userService.$inject = ['$resource'];

    function userService ($resource) {
    	
    	var resourceUrl =  '/user/:id';
    	return $resource(resourceUrl, {}, {
    		
    	});
    	
    
        
    }
})();
