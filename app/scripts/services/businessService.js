'use strict';

// A service that handles interaction with our API for businesses.

angular.module('nhvioApp')
  .service('BusinessService', ['Restangular', '$q', function UserService(Restangular, $q) {

    // The business list may be fetched multiple times,
    // but will unlikley change. Let's cache it in
    // the client so that browsing back and forth
    // is lickety-split.
    var cachedBusinessList = null;

    // Get a list of all users from the server
    var getBusinesses = function(){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
        if (cachedBusinessList != null){
        		deferred.resolve(cachedBusinessList);
        }else{
            Restangular.one('companies').getList().then(function(businesses){
                cachedBusinessList = businesses;
                deferred.resolve(businesses);
        	});
        }
    	return deferred.promise;
    }

    var clearBusinessList = function(){
        cachedBusinessList = null;
    }

    return {
    	getBusinesses: getBusinesses,
        clearBusinessList: clearBusinessList,
    }
  }]);
