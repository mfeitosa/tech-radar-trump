'use strict';

/**
 * @ngdoc service
 * @name radarAppApp.APIService
 * @description
 * # APIService
 * Service in the radarAppApp.
 */
angular.module('radarAppApp')
  .service('APIService', function APIService() {
  	var registeredPlayerCache = {};
  	var battle = {};
	this.validatePin = function (pin) {
		if(pin==='1234'){
			return true;
		}else{
			return false;
		}
	};
	this.registerPlayer = function(playerData){
		var response = playerData;
		response.id = 'mocked49';
		registeredPlayerCache[response.id] = response;
		return response;
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
