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
			
			  $scope.toggleDetails2 = function() {
                $scope.showDetails2 = !$scope.showDetails2;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
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
			
		$scope.stars=[{value:1, label:'1'},{value:2, label:'2'},{value:3, label:'3'},{value:4, label:'4'},{value:5, label:'5'}]
            
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

		.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            $scope.new_feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",areacode:"", telnum:"",feedback:"", date:"" };
            $scope.invalidChannelSelection = false;
			
			$scope.sendFeedback = function() {
                if ($scope.new_feedback.agree && ($scope.new_feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect channel selection');
                }
                else {
					$scope.new_feedback.data=new Date().toISOString();
					console.log($scope.new_feedback)
					feedbackFactory.getFeedback().save($scope.new_feedback ) 
                    $scope.new_feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"",areacode:"", telnum:"",feedback:"", date:"" };
					                    $scope.invalidChannelSelection = false;
                    $scope.feedbackForm.$setPristine();
                }
            };
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
			$scope.Promotion = menuFactory.getPromotion().get({id:0}).$promise.then(
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
