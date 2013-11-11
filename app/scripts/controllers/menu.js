'use strict';

// Menu controller, which is "in charge of" the
// menu that runs across the top of the client
// side application.  
// 
angular.module('nhvioApp')
  .controller('MenuCtrl', ['$scope', 'UserService', function ($scope, UserService) {

  	// The scope variable "me" is defined
  	// only when the user is logged in.
  	//
  	// When the user is not logged in, it's
  	// either undefined or otherwise "falsy".
    $scope.me = null;
    UserService.getMe().then(function(user){
    	$scope.me = user;
    });


  }]);
