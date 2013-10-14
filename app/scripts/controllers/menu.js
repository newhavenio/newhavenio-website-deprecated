'use strict';

angular.module('nhvioApp')
  .controller('MenuCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.me = UserService.getMe();
  }]);
