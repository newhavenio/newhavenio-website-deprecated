'use strict';

angular.module('nhvioApp')
  .controller('UsersCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.users = UserService.getUsers();

    // Function that can be used in the view
    // to delete a user by id.
    $scope.deleteUser = function(userId){

    	// Make sure they're sure.
		var sure = confirm('Are you sure you want to delete?');
		if (!sure){return}

		// Delete the user.
    	UserService.deleteUser(userId);

    };
}]);
