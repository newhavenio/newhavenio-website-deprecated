'use strict';

var app = angular.module('nhvioApp', [])
app.config(function ($routeProvider) {
    $routeProvider
      .when('', {
        templateUrl: 'views/main.html',
        controller: 'MeetupCtrl'
      })
      .otherwise({
        redirectTo: ''
      });
});