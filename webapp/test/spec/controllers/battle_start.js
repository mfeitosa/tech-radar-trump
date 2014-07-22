'use strict';

describe('Controller: BattleStartCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var BattleStartCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    BattleStartCtrl = $controller('BattleStartCtrl', {
      $scope: scope,
      $location: location,
      APIService: {
        startBattle: function(playerId1, playerId2){
          if (playerId1 === playerId2){
            return {error:'Você não pode jogar sozinho.'};
          }
          if ((!playerId1 || !playerId2) || (playerId1.length===0 || playerId2.length===0)){
            return {error:'ID é obrigatório.'};
          }
          return {player1:{name:'Fulano'}, player2:{name:'Cicrano'}};
        }
      }
    });
  }));

  it('should try to start a battle with validation on parameters', function () {
    function newBattleBetween(id1,id2){
      scope.inputId1 = id1;
      scope.inputId2 = id2;
      location.url('/battle_start');
      scope.startBattle();      
    }

    newBattleBetween('t34ert',undefined);
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/battle_start');

    newBattleBetween('t34ert','');
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/battle_start');

    newBattleBetween('t34ert','t34ert');
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/battle_start');

    scope.message = '';
    newBattleBetween('t34ert', 'sdf234');
    expect(scope.message.length).toBe(0);
    expect(location.url()).not.toBe('/battle_start');
    
  });
});
