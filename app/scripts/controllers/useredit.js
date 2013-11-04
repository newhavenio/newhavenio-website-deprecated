'use strict';

angular.module('nhvioApp')
  .controller('UserEditCtrl', ['$scope', '$routeParams', '$window', 'UserService', function ($scope, $routeParams, $window, UserService) {

  	// Note that, here we've got a callback on the promise instead
  	// of directly using the value of the promise because we'd like
  	// to enable two-way binding in the user-edit form.
  	var wasNewlyRegistered = false;
    UserService.getUser($routeParams.developerId).then(function(user){
    	$scope.user = user;	
    	if (user.newlyRegistered) {
    		wasNewlyRegistered = true;
    		// Set them to active by default in the interface.
    		user.active = true;
    	};
    });

    $scope.programmingLanguages = [
			"Processing", 
			"Rank", 
			"C#", 
			"Racket", 
			"Objective-C", 
			"Haskell", 
			"Puppet", 
			"Go", 
			"Objective-J", 
			"Visual Basic", 
			"Smalltalk", 
			"Java", 
			"Lua", 
			"Apex", 
			"Delphi", 
			"Perl", 
			"CoffeeScript", 
			"Common Lisp", 
			"Matlab", 
			"ActionScript", 
			"Haxe", 
			"Erlang", 
			"CSS", 
			"Verilog", 
			"F#", 
			"Shell", 
			"Assembly", 
			"XSLT", 
			"Python", 
			"LiveScript", 
			"Vala", 
			"JavaScript", 
			"Dart", 
			"Julia", 
			"Elixir", 
			"Ada", 
			"PHP", 
			"Ruby", 
			"Groovy", 
			"C", 
			"Scheme", 
			"D", 
			"C++", 
			"ColdFusion", 
			"Arduino", 
			"Scala", 
			"OCaml", 
			"TypeScript", 
			"R", 
			"FORTRAN", 
			"ASP", 
			"Tcl", 
			"Clojure", 
			"AppleScript", 
			"Rust", 
			"Prolog"
		];

	$scope.range = function(min, max, step){
		step = (step == undefined) ? 1 : step;
		var input = [];
		for (var i=min; i<=max; i+=step){
			input.push(i);
		}
		return input;
	};
	$scope.logUser = function(){
		console.log($scope.user);
	}

	// Remove the current user
	$scope.remove = function(){
		console.log("Deleting user", $scope.user);
		$scope.submitting = true;
		$scope.user.remove().then(function(){
			$scope.submitting = false;

			// Remove user from current scope,
			// clear our cache of users in the
			// UserService.  Redirect to the 
			// list of users.
			$scope.user = null;
			UserService.clearAll();
			$window.location.href = '/developers';
		}, function(response) {
			$scope.submitting = false;
			alert('Error removing user!');
		})
	}

	// Save the current user
	$scope.put = function(){
		console.log("submitting", $scope.user);
		$scope.submitting = true;
		$scope.user.put().then(function(){
			$scope.submitting = false;

			// If they were just registering,
			// redirect them to the developer page
			if (wasNewlyRegistered) {
				$window.location.href = '/developers';		
			};
		}, function(response) {
			$scope.submitting = false;
			alert('Error saving!');
		})
	}
  }]);
