/**
 * 
 */
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('ticketService', ticketService);

    ticketService.$inject = ['$resource'];

    function ticketService ($resource) {
    	
    	var resourceUrl =  '/ticket/:id';
    	return $resource(resourceUrl, {}, {
    		
    		
    		'deleteTacheDestByTicketId' : {
				method : 'GET',
				url : '/deleteTacheDestByTicketId/:id'
			}
    	});
    	
    
        
    }
})();