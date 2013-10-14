'use strict';

// A service that handles interaction with our API for users.
// Within the front-end application, users are referred to as
// "developers".
// 
angular.module('nhvioApp')
  .service('UserService', ['Restangular', '$q', function UserService(Restangular, $q) {
    var cachedUserList = null;

    var getUsers = function(){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
    	Restangular.one('users').getList().then(function(users){
    		deferred.resolve(users);
    	});
    	return deferred.promise;
    }
    var getUser = function(userId){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
    	Restangular.one('users', userId).get().then(function(user){
            console.log('User = ', user);
    		deferred.resolve(user);
    	});
    	return deferred.promise;
    }
    var getMe = function(){
        return getUser('me');
    }

    return {
    	getUsers: getUsers,
    	getUser: getUser,
        getMe: getMe
    }
  }]);
