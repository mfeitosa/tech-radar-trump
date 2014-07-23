'use strict';

/**
 * @ngdoc function
 * @name radarAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp')
  .controller('MainCtrl', function ($scope, $location, APIService) {
    $scope.message = false;
    $scope.sendPin = function (){
      APIService.validatePin($scope.inputPin, function(){
        $scope.message = false;
        $location.path('/control_panel');
      }, function(){
        $scope.message = 'Invalid PIN';
      });
    };
  });
