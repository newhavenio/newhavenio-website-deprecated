'use strict';

var app = angular.module('nhvioApp', ['restangular'])
app.config(['$routeProvider', function ($routeProvider) {
  var defaultController = {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'    
  }
  // If we're on admin, use the admin controller
  // instead of the profile controller
  if (/admin/.test(window.location.href)){
    defaultController = {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'    
    }
  }
  $routeProvider
    // .when('', defaultController)
    .when('/', defaultController)
    .when('/developers/:developerId/edit', {
      templateUrl: 'views/user-edit.html',
      controller: 'UserEditCtrl'
    })
    .when('/companies/add', {
      templateUrl: 'views/company-edit.html',
      controller: 'CompanyEditCtrl'
    })
    .when('/companies/:companyId/edit', {
      templateUrl: 'views/company-edit.html',
      controller: 'CompanyEditCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
app.config(['RestangularProvider', function (RestangularProvider) {
    // In this case we are mapping the id of each element to the _id field.
    // See http://www.ng-newsletter.com/posts/restangular.html
    RestangularProvider.setRestangularFields({
      id: "_id",
    });
    RestangularProvider.setBaseUrl('/api');
}]);
