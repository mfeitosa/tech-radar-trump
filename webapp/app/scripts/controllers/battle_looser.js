'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleLooserCtrl
 * @description
 * # BattleLooserCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('BattleLooserCtrl', function ($scope, $location, APIService) {
    $scope.battleData = APIService.getBattleData();
    $scope.looser = $scope.battleData[$scope.battleData.looser];
    $scope.endBattle = function(){
   		var response = APIService.endBattle($scope.inputPin);
   		if(response.error){
   			$scope.message = response.error;
   		}else{
   			$scope.message = '';
   			$location.path('battle_thanks');
   		}
    }
  });
