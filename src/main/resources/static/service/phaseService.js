(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('phaseService', phaseService);

    phaseService.$inject = ['$resource'];

    function phaseService ($resource) {
    	
    	var resourceUrl =  '/midgard/phase/:id';
    	return $resource(resourceUrl, {}, {
    		'getByIdProjet': {
                method: 'GET',
                isArray: true,
                url: '/midgard/getByIdProjet/:id'
              },
    	
    	'savePhaseAux': {
            method: 'POST',
            url: '/midgard/savePhaseAux',
            params: {'Idphase':1,'idProjet':2}
          }
    	});
    	
    
        
    }
})();