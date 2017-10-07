
(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('userService', userService);

    userService.$inject = ['$resource'];

    function userService ($resource) {
    	
    	var resourceUrl =  '/user/:id';
    		return $resource(resourceUrl, {}, {
        		'userByLogin': {
                    method: 'GET',
                    isArray: false,
                    url: '/userByLogin/:login' ,
                    params:{login:'login'}
                  }
    	});
    	
    
        
    }
})();
