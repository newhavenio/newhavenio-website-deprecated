'use strict';

var app = angular.module('nhvioApp', [])
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('', {
        templateUrl: 'views/main.html',
        controller: 'MeetupCtrl'
      })
      .otherwise({
        redirectTo: ''
      });
}]);