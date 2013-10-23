'use strict';

describe('Controller: UserEditCtrl', function () {

  // load the controller's module
  beforeEach(module('nhvioApp'));

  var UserEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserEditCtrl = $controller('UserEditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
