'use strict';

describe('Controller: EditPlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var EditPlayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditPlayerCtrl = $controller('EditPlayerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
