'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:AdminPanelCtrl
 * @description
 * # AdminPanelCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('PanelCtrl', function ($scope, $cookies) {
  	if($cookies.admin){
	    $scope.panelOptions = {
	      'Jogadores':'/list_players',
	      'Adicionar Jogador':'/add_player',
	    };
  	}else{
  		$scope.panelOptions = {
	      'Resultados':'/results'
	    };
  	}
  });
