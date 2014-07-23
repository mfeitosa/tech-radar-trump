'use strict';

/**
 * @ngdoc service
 * @name radarAppApp.APIService
 * @description
 * # APIService
 * Service in the radarAppApp.
 */
angular.module('radarAppApp')
  .service('APIService', function APIService($http, $window) {
  	var HOST = 'http://'+$window.location.host;
  	var battle = {};
  	this.playerInfo = undefined;
	this.validatePin = function (pin, success, error) {
		$http.post(HOST+'/api/admin',{"pin":pin}).success(success).error(error);
	};
  this.viewRank = function (playerId, success, error){
    $http.get(HOST+'/api/users/points/'+playerId).success(success).error(error);
  };
	this.registerPlayer = function(playerData, success, error){
		$http.post(HOST+'/api/users',playerData).success(success).error(error);
    };
    this.updatePoints = function(playerId, points, success, error){
    	$http.post(HOST+'/api/users/points',
	    	{
			   "id": playerId,
			   "points": points
			}
		).success(success).error(error);
    };
    this.getPlayer = function (playerId, success, error){
    	$http.get(HOST+'/api/users/'+playerId).success(success).error(error);
    };
    this.listPlayers = function (success, error){
    	$http.get(HOST+'/api/users').success(success).error(error);
    };
    this.startBattle = function(playerId1, playerId2){
		if (playerId1 === playerId2){
			return {error:'Você não pode jogar sozinho.'};
		}
		if ((!playerId1 || !playerId2) || (playerId1.length===0 || playerId2.length===0)){
			return {error:'ID é obrigatório.'};
		}
		battle = {player1:{name:'Fulano', id:playerId1}, player2:{name:'Cicrano', id:playerId2}};
		return battle;
    };
    this.getBattleData = function(){
    	return battle;
    }
    this.selectedLooser = function(looser){
		battle['looser']=looser;
		return true;
    };
    this.endBattle= function(looserPin){
      if (looserPin==='1234') {
        return true;
      }else{
        return {error:'Invalid PIN'};
      }
    };
  });
