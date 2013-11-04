'use strict';

// Users controller, in charge of the users list view.
//
angular.module('nhvioApp')
  .controller('CompanyCtrl', ['$scope', 'CompanyService', function ($scope, CompanyService) {
    $scope.companies = CompanyService.getCompanies();
}]);
