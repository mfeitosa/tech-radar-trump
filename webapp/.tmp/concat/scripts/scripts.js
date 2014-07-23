'use strict';
/**
 * @ngdoc overview
 * @name radarAppApp
 * @description
 * # radarAppApp
 *
 * Main module of the application.
 */
angular.module('radarAppApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/view_single_rank.html',
      controller: 'ViewSingleRankCtrl'
    }).when('/admin', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/control_panel', {
      templateUrl: 'views/control_panel.html',
      controller: 'PanelCtrl'
    }).when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    }).when('/add_player', {
      templateUrl: 'views/add_player.html',
      controller: 'AddPlayerCtrl'
    }).when('/player_info/:player_id?', {
      templateUrl: 'views/player_info.html',
      controller: 'PlayerInfoCtrl'
    }).when('/battle_start', {
      templateUrl: 'views/battle_start.html',
      controller: 'BattleStartCtrl'
    }).when('/battle', {
      templateUrl: 'views/battle.html',
      controller: 'BattleCtrl'
    }).when('/battle_looser', {
      templateUrl: 'views/battle_looser.html',
      controller: 'BattleLooserCtrl'
    }).when('/battle_thanks', {
      templateUrl: 'views/battle_thanks.html',
      controller: 'BattleThanksCtrl'
    }).when('/list_players', {
      templateUrl: 'views/list_players.html',
      controller: 'ListPlayersCtrl'
    }).when('/edit_player/:player_id', {
      templateUrl: 'views/edit_player.html',
      controller: 'EditPlayerCtrl'
    }).when('/view_single_rank/:player_id', {
      templateUrl: 'views/view_single_rank.html',
      controller: 'ViewSingleRankCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('MainCtrl', [
  '$scope',
  '$location',
  'APIService',
  function ($scope, $location, APIService) {
    $scope.message = false;
    $scope.sendPin = function () {
      APIService.validatePin($scope.inputPin, function () {
        $scope.message = false;
        $location.path('/control_panel');
      }, function () {
        $scope.message = 'Invalid PIN';
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('AboutCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
/**
 * @ngdoc service
 * @name radarAppApp.APIService
 * @description
 * # APIService
 * Service in the radarAppApp.
 */
angular.module('radarAppApp').service('APIService', [
  '$http',
  '$window',
  function APIService($http, $window) {
    var HOST = 'http://' + $window.location.host;
    var battle = {};
    this.playerInfo = undefined;
    this.validatePin = function (pin, success, error) {
      $http.post(HOST + '/api/admin', { 'pin': pin }).success(success).error(error);
    };
    this.viewRank = function (playerId, success, error) {
      $http.get(HOST + '/api/users/points/' + playerId).success(success).error(error);
    };
    this.registerPlayer = function (playerData, success, error) {
      $http.post(HOST + '/api/users', playerData).success(success).error(error);
    };
    this.updatePoints = function (playerId, points, success, error) {
      $http.post(HOST + '/api/users/points', {
        'id': playerId,
        'points': points
      }).success(success).error(error);
    };
    this.getPlayer = function (playerId, success, error) {
      $http.get(HOST + '/api/users/' + playerId).success(success).error(error);
    };
    this.listPlayers = function (success, error) {
      $http.get(HOST + '/api/users').success(success).error(error);
    };
    this.startBattle = function (playerId1, playerId2) {
      if (playerId1 === playerId2) {
        return { error: 'Voc\xea n\xe3o pode jogar sozinho.' };
      }
      if (!playerId1 || !playerId2 || (playerId1.length === 0 || playerId2.length === 0)) {
        return { error: 'ID \xe9 obrigat\xf3rio.' };
      }
      battle = {
        player1: {
          name: 'Fulano',
          id: playerId1
        },
        player2: {
          name: 'Cicrano',
          id: playerId2
        }
      };
      return battle;
    };
    this.getBattleData = function () {
      return battle;
    };
    this.selectedLooser = function (looser) {
      battle['looser'] = looser;
      return true;
    };
    this.endBattle = function (looserPin) {
      if (looserPin === '1234') {
        return true;
      } else {
        return { error: 'Invalid PIN' };
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:AdminPanelCtrl
 * @description
 * # AdminPanelCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('PanelCtrl', [
  '$scope',
  '$cookies',
  function ($scope, $cookies) {
    if ($cookies.admin) {
      $scope.panelOptions = {
        'Jogadores': '/list_players',
        'Adicionar Jogador': '/add_player',
        'Resultados': '/results'
      };
    } else {
      $scope.panelOptions = { 'Resultados': '/results' };
    }
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:AddPlayerCtrl
 * @description
 * # AddPlayerCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('AddPlayerCtrl', [
  '$scope',
  '$location',
  'APIService',
  function ($scope, $location, APIService) {
    $scope.registerPlayer = function () {
      var playerData = {
          name: $scope.name,
          email: $scope.email,
          company: $scope.company,
          job: $scope.job,
          city: $scope.city
        };
      var response = APIService.registerPlayer(playerData, function success(response) {
          APIService.playerInfo = response;
          $location.path('/player_info');
        }, function error(response) {
          $scope.message = 'Error';
        });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:PlayerInfoCtrl
 * @description
 * # PlayerInfoCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('PlayerInfoCtrl', [
  '$scope',
  '$routeParams',
  '$cookies',
  'APIService',
  function ($scope, $routeParams, $cookies, APIService) {
    var playerId = $routeParams.player_id;
    function loadData() {
      if (!playerId || !playerId.length) {
        $scope.player = APIService.playerInfo;
      } else {
        APIService.getPlayer(playerId, function success(result) {
          $scope.player = result;
        }, function error() {
          $scope.player = false;
        });
      }
    }
    ;
    loadData();
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleStartCtrl
 * @description
 * # BattleStartCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('BattleStartCtrl', [
  '$scope',
  '$location',
  'APIService',
  function ($scope, $location, APIService) {
    $scope.message = '';
    $scope.startBattle = function () {
      var response = APIService.startBattle($scope.inputId1, $scope.inputId2);
      if (response.error) {
        $scope.message = response.error;
      } else {
        $location.path('/battle');
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleCtrl
 * @description
 * # BattleCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('BattleCtrl', [
  '$scope',
  '$location',
  'APIService',
  function ($scope, $location, APIService) {
    var battleData = APIService.getBattleData();
    if (!battleData.player1 || !battleData.player2)
      $location.path('/battle_start');
    $scope.player1 = battleData.player1;
    $scope.player2 = battleData.player2;
    $scope.selectedLooser = function (looser) {
      var response = APIService.selectedLooser(looser);
      if (response.error) {
        $scope.message = response.error;
      } else {
        $location.path('/battle_looser');
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleLooserCtrl
 * @description
 * # BattleLooserCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('BattleLooserCtrl', [
  '$scope',
  '$location',
  'APIService',
  function ($scope, $location, APIService) {
    $scope.battleData = APIService.getBattleData();
    $scope.looser = $scope.battleData[$scope.battleData.looser];
    $scope.endBattle = function () {
      var response = APIService.endBattle($scope.inputPin);
      if (response.error) {
        $scope.message = response.error;
      } else {
        $scope.message = '';
        $location.path('battle_thanks');
      }
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:BattleThanksCtrl
 * @description
 * # BattleThanksCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('BattleThanksCtrl', [
  '$scope',
  function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:ListPlayersCtrl
 * @description
 * # ListPlayersCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('ListPlayersCtrl', [
  '$scope',
  '$location',
  '$cookies',
  'APIService',
  function ($scope, $location, $cookies, APIService) {
    if ($cookies.admin) {
      $scope.canEdit = true;
    }
    $scope.registeredPlayer = APIService.listPlayers(function success(response) {
      $scope.players = response;
    }, function error() {
      $location.path('/control_panel');
    });
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:EditPlayerCtrl
 * @description
 * # EditPlayerCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('EditPlayerCtrl', [
  '$scope',
  '$location',
  '$cookies',
  '$routeParams',
  'APIService',
  function ($scope, $location, $cookies, $routeParams, APIService) {
    var playerId = $routeParams.player_id;
    if (!$cookies.admin) {
      $location.path('/admin');
    }
    $scope.sendPoints = function () {
      APIService.updatePoints(playerId, $scope.inputPoints, function success() {
        $location.path('/control_panel');
      }, function error() {
        $scope.message = 'Erro atualizando pontua\xe7\xe3o.';
      });
    };
  }
]);
'use strict';
/**
 * @ngdoc function
 * @name radarAppApp.controller:ViewSingleRankCtrl
 * @description
 * # ViewSingleRankCtrl
 * Controller of the radarAppApp
 */
angular.module('radarAppApp').controller('ViewSingleRankCtrl', [
  '$scope',
  '$routeParams',
  'APIService',
  function ($scope, $routeParams, APIService) {
    $scope.playerId = $routeParams.player_id;
    function loadRank() {
      if (!$scope.playerId)
        return;
      APIService.viewRank($scope.playerId, function success(response) {
        $scope.message = '';
        $scope.rank = response;
      }, function error(res) {
        $scope.message = 'Jogador n\xe3o encontrado.';
      });
    }
    ;
    loadRank();
    $scope.viewRank = function () {
      $scope.playerId = $scope.inputPlayerID;
      loadRank();
    };
  }
]);