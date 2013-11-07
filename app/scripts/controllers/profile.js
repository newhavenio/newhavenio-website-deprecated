'use strict';

angular.module('nhvioApp')
  .controller('ProfileCtrl', ['$scope', '$routeParams', '$window', 'UserService', 'CompanyService', 'LanguageService', function ($scope, $routeParams, $window, UserService, CompanyService, LanguageService) {

    var wasNewlyRegistered = false;
    UserService.getMe().then(function(user){
      $scope.user = user;

      if (user.newlyRegistered) {
        wasNewlyRegistered = true;
        // Set them to active by default in the interface.
        user.active = true;
      };
    });
  }]);
