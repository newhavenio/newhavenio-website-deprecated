'use strict';

// Users controller, in charge of the users list view.
//
angular.module('nhvioApp')
  .controller('BusinessesCtrl', ['$scope', 'BusinessService', function ($scope, BusinessService) {
    $scope.businesses = BusinessService.getBusinesses();
}]);
