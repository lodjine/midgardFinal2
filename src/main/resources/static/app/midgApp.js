var midgApp = angular.module('midgApp', ['ui.router','ngResource']);



angular.module('midgApp')
.directive("formatDate", function(){
  return {
   require: 'ngModel',
    link: function(scope, elem, attr, modelCtrl) {
      modelCtrl.$formatters.push(function(modelValue){
        return new Date(modelValue);
      })
    }
  }
});

midgApp.config(function($stateProvider, $urlRouterProvider) {

    

    $stateProvider.state('projet', {
            url: '/listProjets',
            templateUrl: 'page/projet/listProjet.html',
			controller: 'projetCtrl'
        }).state('formProjet', {
            url: '/nouveauProjet',
            templateUrl: 'page/projet/formProjet.html',
			controller: 'projetCtrl'

        }).state('event', {
            url: '/listEvents',
            templateUrl: 'page/event/listevent.html',
			controller: 'eventController'

        }).state('nouveauEvent', {
            url: '/nouveauEvent',
            templateUrl: 'page/event/formevent.html',
			controller: 'eventController'

        }).state('detailEvent', {
    		url : '/detailEvent/:id',
    		templateUrl: 'page/event/modifEvent.html',
    		controller : 'detailEvent'
    			
        }).state('detailProjet', {
    		url : '/detailProjet/:id',
    		templateUrl : 'page/projet/modifProjet.html',
    		controller : 'modifProjetCtrl'
    			
        }).state('listPhase', {
    		url : '/listPhase',
    		templateUrl : 'page/phase/listPhase.html',
    		controller : 'phaseCtrl'
    			
        }).state('listUser', {
    		url : '/listUser',
    		templateUrl : 'page/user/listUser.html',
    		controller : 'userCtrl'
    			
        }).state('adduser', {
    		url : '/AjouterUtilisateur',
    		templateUrl : 'page/user/adduser.html',
    		controller : 'adduser'
    			
        }).state('detailUser', {
    		url : '/detailUser/:id',
    		templateUrl : 'page/user/adduser.html',
    		controller : 'detailUser'
    			
        }).state('listTache', {
    		url : '/listTache',
    		templateUrl : 'page/tache/listTache.html',
    		controller : 'tacheCtrl'
    			
        }).state('formTache', {
            url: '/nouvelleTache',
            templateUrl: 'page/tache/formTache.html',
			controller: 'tacheCtrl'

        }).state('detailPhase', {
            url: '/detailPhase/:id',
            templateUrl: 'page/phase/formPhase.html',
			controller: 'editPhase'

        });
    
});