'use strict';

describe('Controller: BattleLooserCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var BattleLooserCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    BattleLooserCtrl = $controller('BattleLooserCtrl', {
      $scope: scope,
      $location: location,
      APIService: {
        getBattleData: function(){
          return {player1:{name:'Fulano', id:'id1'}, player2:{name:'Cicrano', id:'id2'}, looser:'player1'};
        },
        endBattle: function(looserPin){
          if (looserPin==='1234') {
            return true;
          }else{
            return {error:'Invalid PIN'};
          }
        }
      }
    });
  }));

  it('should receive the looser pin and finalize the battle', function () {
    expect(scope.battleData['looser']).toBeDefined();
    expect(scope.battleData[scope.battleData['looser']]).toEqual(scope.looser);

    location.url('/batte_looser');

    scope.inputPin = undefined;
    scope.endBattle();
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/batte_looser');

    scope.inputPin = '';
    scope.endBattle();
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/batte_looser');

    scope.inputPin = 'wrongPass';
    scope.endBattle();
    expect(scope.message.length).toBeGreaterThan(0);
    expect(location.url()).toBe('/batte_looser');

    scope.inputPin = '1234';
    scope.endBattle();
    expect(scope.message.length).toBe(0);
    expect(location.url()).toBe('/battle_thanks');
  });
});
