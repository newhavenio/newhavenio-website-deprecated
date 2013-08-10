'use strict';

angular.module('nhvioApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
