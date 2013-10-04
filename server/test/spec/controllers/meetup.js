'use strict';

describe('Controller: MeetupCtrl', function () {

  // load the controller's module
  beforeEach(module('nhvioApp'));

  var MeetupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetupCtrl = $controller('MeetupCtrl', {
      $scope: scope
    });
  }));

  // it('should have a list of events', function () {
  //   expect(scope.events).toBeDefined();
  // });
});
