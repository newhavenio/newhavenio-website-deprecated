'use strict';

describe('Service: Languageservice', function () {

  // load the service's module
  beforeEach(module('NhvioApp'));

  // instantiate service
  var Languageservice;
  beforeEach(inject(function (_Languageservice_) {
    Languageservice = _Languageservice_;
  }));

  it('should do something', function () {
    expect(!!Languageservice).toBe(true);
  });

});
