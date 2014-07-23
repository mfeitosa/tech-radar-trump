'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:PlayerInfoCtrl
 * @description
 * # PlayerInfoCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('PlayerInfoCtrl', function ($scope, $routeParams, $cookies, APIService) {
  	var playerId = $routeParams.player_id;
  	function loadData () {
	  	if (!playerId || !playerId.length) {
		    $scope.player = APIService.playerInfo;	
	  	}else{
	  		APIService.getPlayer(playerId, function success (result){
	  			$scope.player = result;
	  		}, function error (){
	  			$scope.player = false;
	  		});
	  	}
  	};
  	loadData();
  });
