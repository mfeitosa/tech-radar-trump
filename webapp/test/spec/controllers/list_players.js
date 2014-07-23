'use strict';

describe('Controller: ListPlayersCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var ListPlayersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListPlayersCtrl = $controller('ListPlayersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
