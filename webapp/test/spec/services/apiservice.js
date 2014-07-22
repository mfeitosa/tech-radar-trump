'use strict';

describe('Service: APIService', function () {

  // load the service's module
  beforeEach(module('radarAppApp'));

  // instantiate service
  var APIService;
  beforeEach(inject(function (_APIService_) {
    APIService = _APIService_;
  }));

  it('should do something', function () {
    expect(!!APIService).toBe(true);
  });

});
