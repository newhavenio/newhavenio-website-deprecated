'use strict';

describe('Controller: CompanyeditCtrl', function () {

  // load the controller's module
  beforeEach(module('nhvioApp'));

  var CompanyeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanyeditCtrl = $controller('CompanyeditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
