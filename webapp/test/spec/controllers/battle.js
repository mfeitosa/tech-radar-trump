'use strict';

describe('Controller: BattleCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var BattleCtrl,
    scope,
    location,
    selectedLooser;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    BattleCtrl = $controller('BattleCtrl', {
      $scope: scope,
      $location: location,
      APIService: {
        getBattleData: function(){
          return {player1:{name:'Fulano', id:'id1'}, player2:{name:'Cicrano', id:'id2'}};
        },
        selectedLooser: function(looser){
          selectedLooser = looser;
          return true;
        }
      }
    });
  }));

  it('should select the battle looser', function () {
    expect(scope.player1).toEqual({name:'Fulano', id:'id1'});
    expect(scope.player2).toEqual({name:'Cicrano', id:'id2'});

    scope.selectedLooser(scope.player1);
    expect(selectedLooser).toBe(scope.player1);
    expect(location.url()).toBe('/battle_looser');

    scope.selectedLooser(scope.player2);
    expect(selectedLooser).toBe(scope.player2);
    expect(location.url()).toBe('/battle_looser');
  });
});
