'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('radarAppApp'));

  var MainCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $location : location,
      APIService : {
        validatePin : function (pin) {
          if(pin==='1234'){
            return true;
          }else{
            return false;
          }
        }
      }
    });
  }));

  it('should validate a pin and redirect or warn about invalid pin', function () {
    scope.inputPin = '1234wrong1234';
    scope.sendPin();
    expect(scope.message).toBe('Invalid PIN');

    scope.inputPin = '1234';
    scope.sendPin();
    expect(scope.message).toBe(false);
    expect(location.url()).toBe('/admin_panel');
  });
});
