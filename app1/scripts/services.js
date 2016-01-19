'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
         .service('menuFactory', ['$resource', 'baseURL', function($http,$resource,baseURL) {
    


    
            this.getDishes = function(){
                     return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                                    };	

			this.getPromotion = function () {    
				return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
                                  };
				
		   }])

        .factory('$resource','corporateFactory','baseURL', function() {

			 corpfac.getLeaders = function(){
							   return $corporateFactory(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
                                    };		
			
            // the other named getLeader(index)
            // corpfac.getLeader = function (index) {
                            // return leadership[index];
						
            // Remember this is a factory not a service
    
             return corpfac;
       } );
