'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleStartCtrl
 * @description
 * # BattleStartCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('BattleStartCtrl', function ($scope, $location, APIService) {
  	$scope.message = '';
    $scope.startBattle = function(){
    	var response = APIService.startBattle($scope.inputId1, $scope.inputId2);
    	if(response.error){
    		$scope.message = response.error;
    	}else{
    		$location.path('/battle');
    	}
    };
  });
