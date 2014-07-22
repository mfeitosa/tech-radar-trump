'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:AddPlayerCtrl
 * @description
 * # AddPlayerCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('AddPlayerCtrl', function ($scope, $location, APIService) {
    $scope.registerPlayer = function(){
    	var playerData = {
    		name: $scope.name,
    		email: $scope.email,
    		company: $scope.company,
    		job: $scope.job,
    		city: $scope.city
    	};
    	var response = APIService.registerPlayer(playerData);
    	if(response.error){
    		$scope.message = response.error;
    	}else{
    		$location.path('/player_info/'+response.id);
    	}
    };
  });
