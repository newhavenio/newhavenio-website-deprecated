'use strict';

describe('Directive: confirmClick', function () {

  // load the directive's module
  beforeEach(module('nhvioApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<confirm-click></confirm-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the confirmClick directive');
  }));
});
