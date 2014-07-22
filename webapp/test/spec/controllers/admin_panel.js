'use strict';

describe('Controller: AdminPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var AdminPanelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPanelCtrl = $controller('AdminPanelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of options for the admin panel', function () {
    expect(Object.keys(scope.adminOptions).length).toBe(3);
  });
});
