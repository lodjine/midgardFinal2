var midgApp = angular.module('midgApp', ['ui.router','ngResource','ui.select2']);



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

//angular.module('midgApp').directive('wbSelect2', function () {
//    return {
//        restrict: 'A',
//        scope: {
//                'selectWidth': '@',
//                'ngModel': '='
//        },
//        link: function (scope, element, attrs) {
//            //Setting default values for attribute params
//            scope.selectWidth = scope.selectWidth || 200;
//            element.select2({
//                width: scope.selectWidth,
//            });
//            
//            scope.$watch('ngModel', function(newVal, oldVal){
//                window.setTimeout(function(){
//                    element.select2("val", newVal);
//                });
//            });
//        }
//    };
//});

midgApp.config(function($stateProvider, $urlRouterProvider) {

	 $urlRouterProvider.otherwise('/home');

    $stateProvider.state('projet', {
            url: '/listProjets',
            templateUrl: 'page/projet/listProjet.html',
			controller: 'projetCtrl'
        }).state('home', {
            url: '/home',
            templateUrl: 'page/home/home.html',
			controller: 'homeController'
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

        }).state('EventTache', {
            url: '/nouveauEventTache',
            templateUrl: 'page/event/EventTache.html',
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

        }).state('detailTache', {
    		url : '/detailTache/:id',
    		templateUrl: 'page/tache/modifTache.html',
    		controller : 'detailTacheCtrl'
    			
        }).state('detailPhase', {
            url: '/detailPhase/:id',
            templateUrl: 'page/phase/formPhase.html',
			controller: 'editPhase'

        }).state('listEntreprise', {
            url: '/listEntreprise',
            templateUrl: 'page/entreprise/listEntreprise.html',
			controller: 'entrepriseController'

        }).state('formEntrep', {
            url: '/nouvelleEntreprise',
            templateUrl: 'page/entreprise/addEntreprise.html',
			controller: 'entrepriseController'

        }).state('listticket', {
            url: '/listTicket',
            templateUrl: 'page/ticket/listticket.html',
			controller: 'ticketController'

        }).state('formticket', {
            url: '/formticket',
            templateUrl: 'page/ticket/formticket.html',
			controller: 'ticketController'

        }).state('modifTicket', {
            url: '/modifTicket/:id',
            templateUrl: 'page/ticket/modifTicket.html',
			controller: 'modifTicket'

        }).state('formTicketProjet', {
            url: '/formTicketProjet/:id',
            templateUrl: 'page/ticket/ticketProEvTach.html',
			controller: 'ticketProEvTach'

        }).state('formEventProjet', {
            url: '/formEventProjet/:id',
            templateUrl: 'page/ticket/ticketProEvTach.html',
			controller: 'ticketProEvTach'

        });
    
    
    
});