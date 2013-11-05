'use strict';

angular.module('nhvioApp')
  .service('LanguageService', ['$http', '$q', function LanguageService($http, $q) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var cachedLanguages = null;

    // Get a list of all users from the server
    var getLanguages = function(){

      // Create a promise representing the result we'll return.
      var deferred = $q.defer();
      if (cachedLanguages != null){
        deferred.resolve(cachedLanguages);
      }else{
        $http.get('/api/languages').then(function(languages){
          cachedLanguages = languages.data;
          deferred.resolve(cachedLanguages);
        });
      }
      return deferred.promise;
    }

    return {
      getLanguages: getLanguages
    }
  }]);
