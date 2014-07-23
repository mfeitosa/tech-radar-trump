'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:ViewSingleRankCtrl
 * @description
 * # ViewSingleRankCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('ViewSingleRankCtrl', function ($scope, $routeParams, APIService) {
  	$scope.playerId = $routeParams.player_id;
  	function loadRank () {
  		if(!$scope.playerId) return;
  		APIService.viewRank($scope.playerId, function success (response) {
  			$scope.message = "";
	    	$scope.rank = response;
	    },function error (res){
	    	$scope.message = "Jogador não encontrado.";
	    });
  	};
    loadRank();
  	$scope.viewRank = function (){
  		$scope.playerId = $scope.inputPlayerID;
  		loadRank();
  	};
  });
