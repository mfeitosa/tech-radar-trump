"use strict";angular.module("radarAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/view_single_rank.html",controller:"ViewSingleRankCtrl"}).when("/admin",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/control_panel",{templateUrl:"views/control_panel.html",controller:"PanelCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/add_player",{templateUrl:"views/add_player.html",controller:"AddPlayerCtrl"}).when("/player_info/:player_id?",{templateUrl:"views/player_info.html",controller:"PlayerInfoCtrl"}).when("/battle_start",{templateUrl:"views/battle_start.html",controller:"BattleStartCtrl"}).when("/battle",{templateUrl:"views/battle.html",controller:"BattleCtrl"}).when("/battle_looser",{templateUrl:"views/battle_looser.html",controller:"BattleLooserCtrl"}).when("/battle_thanks",{templateUrl:"views/battle_thanks.html",controller:"BattleThanksCtrl"}).when("/list_players",{templateUrl:"views/list_players.html",controller:"ListPlayersCtrl"}).when("/edit_player/:player_id",{templateUrl:"views/edit_player.html",controller:"EditPlayerCtrl"}).when("/view_single_rank/:player_id",{templateUrl:"views/view_single_rank.html",controller:"ViewSingleRankCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("radarAppApp").controller("MainCtrl",["$scope","$location","APIService",function(a,b,c){a.message=!1,a.sendPin=function(){c.validatePin(a.inputPin,function(){a.message=!1,b.path("/control_panel")},function(){a.message="Invalid PIN"})}}]),angular.module("radarAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("radarAppApp").service("APIService",["$http","$window",function(a,b){var c="http://"+b.location.host,d={};this.playerInfo=void 0,this.validatePin=function(b,d,e){a.post(c+"/api/admin",{pin:b}).success(d).error(e)},this.viewRank=function(b,d,e){a.get(c+"/api/users/points/"+b).success(d).error(e)},this.registerPlayer=function(b,d,e){a.post(c+"/api/users",b).success(d).error(e)},this.updatePoints=function(b,d,e,f){a.post(c+"/api/users/points",{id:b,points:d}).success(e).error(f)},this.getPlayer=function(b,d,e){a.get(c+"/api/users/"+b).success(d).error(e)},this.listPlayers=function(b,d){a.get(c+"/api/users").success(b).error(d)},this.startBattle=function(a,b){return a===b?{error:"Você não pode jogar sozinho."}:a&&b&&0!==a.length&&0!==b.length?d={player1:{name:"Fulano",id:a},player2:{name:"Cicrano",id:b}}:{error:"ID é obrigatório."}},this.getBattleData=function(){return d},this.selectedLooser=function(a){return d.looser=a,!0},this.endBattle=function(a){return"1234"===a?!0:{error:"Invalid PIN"}}}]),angular.module("radarAppApp").controller("PanelCtrl",["$scope","$cookies",function(a,b){a.panelOptions=b.admin?{Jogadores:"/list_players","Adicionar Jogador":"/add_player",Resultados:"/results"}:{Resultados:"/results"}}]),angular.module("radarAppApp").controller("AddPlayerCtrl",["$scope","$location","APIService",function(a,b,c){a.registerPlayer=function(){{var d={name:a.name,email:a.email,company:a.company,job:a.job,city:a.city};c.registerPlayer(d,function(a){c.playerInfo=a,b.path("/player_info")},function(){a.message="Error"})}}}]),angular.module("radarAppApp").controller("PlayerInfoCtrl",["$scope","$routeParams","$cookies","APIService",function(a,b,c,d){function e(){f&&f.length?d.getPlayer(f,function(b){a.player=b},function(){a.player=!1}):a.player=d.playerInfo}var f=b.player_id;e()}]),angular.module("radarAppApp").controller("BattleStartCtrl",["$scope","$location","APIService",function(a,b,c){a.message="",a.startBattle=function(){var d=c.startBattle(a.inputId1,a.inputId2);d.error?a.message=d.error:b.path("/battle")}}]),angular.module("radarAppApp").controller("BattleCtrl",["$scope","$location","APIService",function(a,b,c){var d=c.getBattleData();d.player1&&d.player2||b.path("/battle_start"),a.player1=d.player1,a.player2=d.player2,a.selectedLooser=function(d){var e=c.selectedLooser(d);e.error?a.message=e.error:b.path("/battle_looser")}}]),angular.module("radarAppApp").controller("BattleLooserCtrl",["$scope","$location","APIService",function(a,b,c){a.battleData=c.getBattleData(),a.looser=a.battleData[a.battleData.looser],a.endBattle=function(){var d=c.endBattle(a.inputPin);d.error?a.message=d.error:(a.message="",b.path("battle_thanks"))}}]),angular.module("radarAppApp").controller("BattleThanksCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("radarAppApp").controller("ListPlayersCtrl",["$scope","$location","$cookies","APIService",function(a,b,c,d){c.admin&&(a.canEdit=!0),a.registeredPlayer=d.listPlayers(function(b){a.players=b},function(){b.path("/control_panel")})}]),angular.module("radarAppApp").controller("EditPlayerCtrl",["$scope","$location","$cookies","$routeParams","APIService",function(a,b,c,d,e){var f=d.player_id;c.admin||b.path("/admin"),a.sendPoints=function(){e.updatePoints(f,a.inputPoints,function(){b.path("/control_panel")},function(){a.message="Erro atualizando pontuação."})}}]),angular.module("radarAppApp").controller("ViewSingleRankCtrl",["$scope","$routeParams","APIService",function(a,b,c){function d(){a.playerId&&c.viewRank(a.playerId,function(b){a.message="",a.rank=b},function(){a.message="Jogador não encontrado."})}a.playerId=b.player_id,d(),a.viewRank=function(){a.playerId=a.inputPlayerID,d()}}]);