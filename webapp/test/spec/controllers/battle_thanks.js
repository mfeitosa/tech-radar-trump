'use strict';

describe('Controller: BattleThanksCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var BattleThanksCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BattleThanksCtrl = $controller('BattleThanksCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
