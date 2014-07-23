'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:ListPlayersCtrl
 * @description
 * # ListPlayersCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('ListPlayersCtrl', function ($scope, $location, $cookies, APIService) {
  	if($cookies.admin){
  		$scope.canEdit = true;
  	}
    $scope.registeredPlayer = APIService.listPlayers(function success (response){
    	$scope.players = response;
    }, function error (){
    	$location.path('/control_panel');
    });
  });
