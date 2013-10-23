'use strict';

var app = angular.module('nhvioApp', ['restangular'])
app.config(function ($routeProvider) {
    $routeProvider
      .when('', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/developers', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/developers/:developerId/edit', {
        templateUrl: 'views/user-edit.html',
        controller: 'UserEditCtrl'
      })
      .when('/developers/:developerId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
      })
      .when('/about', {
        templateUrl: 'views/about.html',
      })
      .when('/irc', {
        templateUrl: 'views/irc.html',
      })
      .otherwise({
        redirectTo: ''
      });
});
app.config(function (RestangularProvider) {
    // In this case we are mapping the id of each element to the _id field.
    // See http://www.ng-newsletter.com/posts/restangular.html
    RestangularProvider.setRestangularFields({
      id: "_id",
    });
});
