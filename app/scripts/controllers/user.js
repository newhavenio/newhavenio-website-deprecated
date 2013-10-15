'use strict';

// User controller, in charge of the user detail view
// 
angular.module('nhvioApp')
  .controller('UserCtrl', ['$scope', '$routeParams', 'UserService', function ($scope, $routeParams, UserService) {
    $scope.user = UserService.getUser($routeParams.developerId);
}]);
