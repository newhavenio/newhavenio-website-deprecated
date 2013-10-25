'use strict';

// A service that handles interaction with our API for users.
// Within the front-end application, users are referred to as
// "developers".
// 
angular.module('nhvioApp')
  .service('UserService', ['Restangular', '$q', function UserService(Restangular, $q) {

    // The user list may be fetched multiple times,
    // but will unlikley change. Let's cache it in
    // the client so that browsing back and forth
    // is lickety-split.
    var cachedUserList = null;
    var cachedMe = null;

    // Get a list of all users from the server
    var getUsers = function(){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
        if (cachedUserList != null){
        		deferred.resolve(cachedUserList);
        }else{
            Restangular.one('users').getList().then(function(users){
                cachedUserList = users;
                deferred.resolve(users);
        	});            
        }
    	return deferred.promise;
    }

    // Get a particular user, by id, from the server
    var getUser = function(userId){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
    	Restangular.one('users', userId).get().then(function(user){
            console.log('User = ', user);
    		deferred.resolve(user);
    	});
    	return deferred.promise;
    }

    // Get myself from the server.  Here, we don't need
    // to specify an id because the server will know who
    // we are by our session credentials in the cookie
    // accompanying this request.
    var getMe = function(){
        if (cachedMe != null) {
            return cachedMe;
        }else{
            return getUser('me');
        };
    }

    var clearMe = function(){
        cachedMe = null;
    }
    var clearUserList = function(){
        cachedUserList = null;
    }
    var clearAll = function(){
        clearMe();
        clearUserList();
    }

    return {
    	getUsers: getUsers,
    	getUser: getUser,
        getMe: getMe,
        clearMe: clearMe,
        clearUserList: clearUserList,
        clearAll: clearAll,
    }
  }]);
