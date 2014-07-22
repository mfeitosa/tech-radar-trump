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
      if (APIService.validatePin($scope.inputPin)){
        $scope.message = false;
        $location.path('/admin_panel');
      }else{
        $scope.message = 'Invalid PIN';
      }
    };
  });
