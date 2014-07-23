'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:EditPlayerCtrl
 * @description
 * # EditPlayerCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('EditPlayerCtrl', function ($scope, $location, $cookies, $routeParams, APIService) {
	var playerId = $routeParams.player_id;
	if(!$cookies.admin){
		$location.path('/admin');
	}
    $scope.sendPoints = function(){
  		APIService.updatePoints(playerId, $scope.inputPoints, function success(){
  			$location.path('/control_panel');
  		}, function error (){
  			$scope.message = "Erro atualizando pontuação."
  		});
  	};
  });
