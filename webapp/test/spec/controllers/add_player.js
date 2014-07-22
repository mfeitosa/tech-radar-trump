'use strict';

describe('Controller: AddPlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var AddPlayerCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    AddPlayerCtrl = $controller('AddPlayerCtrl', {
      $scope: scope,
      $location: location,
      APIService: {
        registerPlayer: function(playerData){
          if (playerData.city === 'many'){
            return {id:'ID900'};
          }else{
            return {error:'error message'};
          }
        }
      }
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    scope.name = 'James Bond';
    scope.email = '007@mi7.uk';
    scope.company = 'TW Uk';
    scope.job = 'Grad Consultant';
    scope.city = 'many';
    scope.registerPlayer();

    expect(location.url()).toBe('/player_info/ID900');

    scope.city = '';
    location.path('/add_player');
    scope.registerPlayer();
    expect(location.url()).toBe('/add_player');
    expect(scope.message).toBe('error message');
  });
});
