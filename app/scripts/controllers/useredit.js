'use strict';

angular.module('nhvioApp')
  .controller('UserEditCtrl', ['$scope', '$routeParams', '$location', 'UserService', function ($scope, $routeParams, $location, UserService) {

  	// Note that, here we've got a callback on the promise instead
  	// of directly using the value of the promise because we'd like
  	// to enable two-way binding in the user-edit form.
    UserService.getUser($routeParams.developerId).then(function(user){
    	$scope.user = user;	
    });

    $scope.programmingLanguages = [
		  "JavaScript",
		  "Ruby",
		  "Java",
		  "PHP",
		  "Python",
		  "C++",
		  "C",
		  "Objective-C",
		  "C#",
		  "Shell",
		  "CSS",
		  "Perl",
		  "CoffeeScript",
		  "Scala",
		  "Go",
		  "Prolog",
		  "Clojure",
		  "Haskell",
		  "Lua",
		  "Rank",
		  "Puppet",
		  "Groovy",
		  "R",
		  "ActionScript",
		  "Matlab",
		  "Arduino",
		  "Erlang",
		  "OCaml",
		  "Visual Basic",
		  "ASP",
		  "Processing",
		  "Common Lisp",
		  "Assembly",
		  "TypeScript",
		  "Dart",
		  "D",
		  "Delphi",
		  "Scheme",
		  "FORTRAN",
		  "Racket",
		  "Elixir",
		  "ColdFusion",
		  "XSLT",
		  "Apex",
		  "F#",
		  "Haxe",
		  "Verilog",
		  "Julia",
		  "Tcl",
		  "Vala",
		  "Rust",
		  "LiveScript",
		  "AppleScript",
		  "DOT",
		  "Ada",
		  "Smalltalk",
		  "Kotlin",
		  "Lasso",
		  "Eiffel",
		  "Io",
		  "M",
		  "Nemerle",
		  "Scilab",
		  "Objective-J",
		  "Awk",
		  "Slash",
		  "XProc",
		  "Xtend",
		  "Nimrod",
		  "CLIPS",
		  "Boo",
		  "Ceylon",
		  "ooc",
		  "MoonScript",
		  "DCPU-16 ASM",
		  "Rebol",
		  "Factor",
		  "Bro",
		  "Dylan",
		  "Monkey",
		  "Nu",
		  "Arc",
		  "Augeas",
		  "PogoScript",
		  "Turing",
		  "XC",
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
			$location.path('/developers');
		}, function(response) {
			$scope.submitting = false;
			console.log("Error with status code", response.status);
		})
	}

	// Save the current user
	$scope.put = function(){
		console.log("submitting", $scope.user);
		$scope.submitting = true;
		$scope.user.put().then(function(){
			$scope.submitting = false;
		}, function(response) {
			$scope.submitting = false;
			console.log("Error with status code", response.status);
		})
	}
  }]);
