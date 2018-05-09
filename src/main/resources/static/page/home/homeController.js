
		    /**
		     * http://usejsdoc.org/
		     */

		    (function() {
		    	'use strict';

		    	angular.module('midgApp').controller('homeController', homeController);
		    	homeController.$inject = [ '$scope', '$state', '$rootScope', 'userService', '$q' ,'roleService','$compile','$timeout','uiCalendarConfig','eventService'];

		    	function homeController($scope, $state, $rootScope, userService,$q,roleService, $compile, $timeout, uiCalendarConfig,eventService) {
		    		var login = localStorage.getItem("login"); 
		    		$rootScope.userConect=userService.userByLogin({login:login});

		    		
		    		
		    		 var date = new Date();
		    		    var d = date.getDate();
		    		    var m = date.getMonth();
		    		    var y = date.getFullYear();

		    		    $scope.changeTo = 'Francais';
		    		  
		    		    $scope.eventSources = [];
		    		    

		    			  
		    			   
		    		   
		    		   
		    		    
		    		    
		    		    $scope.events = eventService.query().$promise.then(function(data) {
		    				$scope.events = angular.fromJson(data);
		    				 $scope.fetchEventToCalender();
		    			});
		    		    
		    		    $scope.fetchEventToCalender= function(){
		    		       $scope.events.forEach(event => {
		    		       var eventCalendar={};
		    		       var dateDebut=new Date(event.dateDebut);
		    		       var dateFin=new Date(event.echeance)
		    		       eventCalendar.title=event.idEvent;
		    		       eventCalendar.start=new Date(dateDebut.getFullYear(),dateDebut.getMonth(),dateDebut.getDate());
		    		       eventCalendar.end=new Date(dateFin.getFullYear(),dateFin.getMonth(),dateFin.getDate());
		    		       eventCalendar.id=event.idEvenement;
		    		       eventCalendar.allDay=true;
		    		       $scope.eventSources.push(eventCalendar);
		    		       }
		    		       );
		    		       console.log( $scope.eventSources);
		    		       $scope.getCalender();
		    		    };
		    		  

		    		    $scope.getCalender= function(){
		    		    /* alert on eventClick */
		    		    $scope.alertOnEventClick = function( date, jsEvent, view){
		    		        $scope.alertMessage = (date.title + ' was clicked ');
		    		    };
		    		    /* alert on Drop */
		    		     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
		    		       $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
		    		    };
		    		    /* alert on Resize */
		    		    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
		    		       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
		    		    };
		    		    /* add and removes an event source of choice */
		    		    $scope.addRemoveEventSource = function(sources,source) {
		    		      var canAdd = 0;
		    		      angular.forEach(sources,function(value, key){
		    		        if(sources[key] === source){
		    		          sources.splice(key,1);
		    		          canAdd = 1;
		    		        }
		    		      });
		    		      if(canAdd === 0){
		    		        sources.push(source);
		    		      }
		    		    };
		    		    /* add custom event*/
		    		    $scope.addEvent = function() {
		    		      $scope.events.push({
		    		        title: 'Open Sesame',
		    		        start: new Date(y, m, 28),
		    		        end: new Date(y, m, 29),
		    		        className: ['openSesame']
		    		      });
		    		    };
		    		    /* remove event */
		    		    $scope.remove = function(index) {
		    		      $scope.events.splice(index,1);
		    		    };
		    		    /* Change View */
		    		    $scope.changeView = function(view,calendar) {
		    		      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
		    		    };
		    		    /* Change View */
		    		    $scope.renderCalendar = function(calendar) {
		    		      $timeout(function() {
		    		        if(uiCalendarConfig.calendars[calendar]){
		    		          uiCalendarConfig.calendars[calendar].fullCalendar('render');
		    		        }
		    		      });
		    		    };
		    		     /* Render Tooltip */
		    		    $scope.eventRender = function( event, element, view ) {
		    		        element.attr({'tooltip': event.title,
		    		                      'tooltip-append-to-body': true});
		    		        $compile(element)($scope);
		    		    };
		    		    /* config object */
		    		    $scope.uiConfig = {
		    		      calendar:{
		    		        height: 450,
		    		        editable: true,
		    		        header:{
		    		          left: 'title',
		    		          center: '',
		    		          right: 'today prev,next'
		    		        },
		    		        eventClick: $scope.alertOnEventClick,
		    		        eventDrop: $scope.alertOnDrop,
		    		        eventResize: $scope.alertOnResize,
		    		        eventRender: $scope.eventRender
		    		      }
		    		    };

		    		   
		    		    
		    		    }
		    		
		    		
		    	}
		    })();



