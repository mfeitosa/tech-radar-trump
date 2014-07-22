'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleCtrl
 * @description
 * # BattleCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('BattleCtrl', function ($scope, $location, APIService) {
	var battleData = APIService.getBattleData();
	if(!battleData.player1 || !battleData.player2) $location.path('/battle_start');
	$scope.player1 = battleData.player1;
	$scope.player2 = battleData.player2;
    $scope.selectedLooser = function(looser){
    	var response = APIService.selectedLooser(looser);
   		if(response.error){
   			$scope.message = response.error;
   		}else{
   			$location.path('/battle_looser');
   		}
    };
  });
