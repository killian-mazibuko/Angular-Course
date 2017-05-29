'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {contactChannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.contactChannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('Incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {contactChannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.contactChannel="";
                    $scope.$parent.feedback = $scope.feedback;
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false
            $scope.message="Loading ..."
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope, menuFactory) {
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.comment.date = new Date().toISOString();
                
                $scope.dish.comments.push($scope.comment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.comment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // Controllers implemented
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

            $scope.showDish = false;
            $scope.showPromotion = false;
            $scope.showExecutiveChefInfo = false;
            $scope.message="Loading ...";
            $scope.messageForPromotionSection = "Loading ...";
            $scope.messageForLeaderSection = "Loading ...";
            $scope.featuredDish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.featuredDish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            $scope.promotion = menuFactory.getPromotion().get({index:0})
                .$promise.then(
                    function(response) {
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.messageForPromotionSection = "Error: " + response.status + " " + response.statusText;
                    }
                );
            $scope.executiveChef = corporateFactory.getLeaders().get({index:0})
                .$promise.then(
                    function(response) {
                        $scope.executiveChef = response;
                        $scope.showExecutiveChefInfo = true;
                    },
                    function(response) {
                        $scope.messageForLeaderSection = "Error: " + response.status + " " + response.statusText;
                    }
                );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.showLeadersInfo = false;
            $scope.messageForLeadersSection="Loading ..."
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeadersInfo = true;
                },
                function(response) {
                    $scope.messageForLeadersSection = "Error: " + response.status + " " + response.statusText;
                }
            );
        }])
;
