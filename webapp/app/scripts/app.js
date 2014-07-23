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
        templateUrl: 'views/view_single_rank.html',
        controller: 'ViewSingleRankCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/control_panel', {
        templateUrl: 'views/control_panel.html',
        controller: 'PanelCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/add_player', {
        templateUrl: 'views/add_player.html',
        controller: 'AddPlayerCtrl'
      })
      .when('/player_info/:player_id?', {
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
      .when('/list_players', {
        templateUrl: 'views/list_players.html',
        controller: 'ListPlayersCtrl'
      })
      .when('/edit_player/:player_id', {
        templateUrl: 'views/edit_player.html',
        controller: 'EditPlayerCtrl'
      })
      .when('/view_single_rank/:player_id', {
        templateUrl: 'views/view_single_rank.html',
        controller: 'ViewSingleRankCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
