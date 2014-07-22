'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:AdminPanelCtrl
 * @description
 * # AdminPanelCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('AdminPanelCtrl', function ($scope) {
    $scope.adminOptions = {
      'Jogadores':'/players',
      'Adicionar Jogador':'/add_player',
      'Resultados':'/results'
    };
  });
