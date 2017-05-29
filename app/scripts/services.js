'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getDishes = function(){
                return $resource(baseURL + "dishes/:id", null,{'update':{method:'PUT'}});
            };

            this.getPromotion = function(index) {
                return $resource(baseURL + "promotions/:index", null,{'update':{method:'PUT'}});
            };
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};

            corpfac.getLeaders = function(){
                return $resource(baseURL + "leadership/:index", null,{'update':{method:'PUT'}});
            };

            return corpfac;
        }])

    .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getFeedback = function(){

            return $resource(baseURL + "feedback/:index", null,{'update':{method:'PUT'}});

        };

        // implement a function named getPromotion
        // that returns a selected promotion.
        this.getPromotion = function(index) {
            return $resource(baseURL + "promotions/:index", null,{'update':{method:'PUT'}});
        };

    }])

;
