'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
			$scope.showMenu = false;
            $scope.message = "Loading Dishes...";
            //$scope.dishes = menuFactory.getDishes().query();
			
			 menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
					$scope.showMenu = false;
                });

                        
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

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
			
           
            $scope.showDish = false;
            $scope.message="Loading dish ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
								$scope.showDish = false;
                            }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.NewComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.NewComment.date = new Date().toISOString();
                console.log($scope.NewComment);
                
                $scope.dish.comments.push($scope.NewComment);
				
				menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.NewComment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
			$scope.showLeaders= false;
            $scope.message="Loading Leaders...";
            $scope.Leaders = corporateFactory.getLeaders().query().$promise.then(
			function(response){
								$scope.Leaders = response;
                                $scope.showLeaders = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
								$scope.showLeaders = false;
                            }
                        );
            
        }])
		
	.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
   
  			$scope.showPromotion= false;
            $scope.message="Loading Promotion...";
			$scope.Promotion = menuFactory.getPromotion().query().$promise.then(
                            function(response){
								$scope.Promotion = response;
                                $scope.showPromotion = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
								$scope.showPromotion = false;
                            }
                        );
			
			
			
			$scope.showLeader= false;
            $scope.message="Loading Leader...";
			$scope.Leader = corporateFactory.getLeaders().get({id:3}).$promise.then(
                            function(response){
								$scope.Leader = response;
                                $scope.showLeader = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
								$scope.showLeader = false;
                            }
                        );
            
			
			$scope.showFeatured = false;
            $scope.message="Loading Featured...";
            $scope.Featured = menuFactory.getDishes().get({id:0}).$promise.then(
                            function(response){
                                $scope.Featured = response;
                                $scope.showFeatured = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
								$scope.showFeatured = false;
                            }
                        );
        }])
		
;
