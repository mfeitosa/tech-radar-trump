'use strict';

/**
 * @ngdoc overview
 * @name radarAppApp
 * @description
 * # radarAppApp
 *
 * Main module of the application.
 */
angular
  .module('radarAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/battle_start.html',
        controller: 'BattleStartCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin_panel', {
        templateUrl: 'views/admin_panel.html',
        controller: 'AdminPanelCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/add_player', {
        templateUrl: 'views/add_player.html',
        controller: 'AddPlayerCtrl'
      })
      .when('/player_info', {
        templateUrl: 'views/player_info.html',
        controller: 'PlayerInfoCtrl'
      })
      .when('/battle_start', {
        templateUrl: 'views/battle_start.html',
        controller: 'BattleStartCtrl'
      })
      .when('/battle', {
        templateUrl: 'views/battle.html',
        controller: 'BattleCtrl'
      })
      .when('/battle_looser', {
        templateUrl: 'views/battle_looser.html',
        controller: 'BattleLooserCtrl'
      })
      .when('/battle_thanks', {
        templateUrl: 'views/battle_thanks.html',
        controller: 'BattleThanksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
