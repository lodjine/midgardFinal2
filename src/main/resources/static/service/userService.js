
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('userService', userService);

    userService.$inject = ['$resource'];

    function userService ($resource) {
    	
    	var resourceUrl =  '/midgard/user/:id';
    		return $resource(resourceUrl, {}, {
        		'userByLogin': {
                    method: 'GET',
                    isArray: false,
                    url: '/midgard/userByLogin/:login' ,
                    params:{login:'login'}
                  }
    	});
    		
    
        
    }
})();
