(function() {
    'use strict';
    angular
        .module('midgApp')
        .factory('phaseService', phaseService);

    phaseService.$inject = ['$resource'];

    function phaseService ($resource) {
    	
    	var resourceUrl =  '/phase/:id';
    	return $resource(resourceUrl, {}, {
    		'getByIdProjet': {
                method: 'GET',
                isArray: true,
                url: '/getByIdProjet/:id'
              },
    	
    	'savePhaseAux': {
            method: 'POST',
            url: '/savePhaseAux',
            params: {'Idphase':1,'idProjet':2}
          }
            ,  'update' : {
  				method : 'PUT',
  				transformResponse : function(data) {
  					if (data) {
  						data = angular.fromJson(data);
  					}
  					return data;
  				}

  			}
    	});
    	
    
        
    }
})();