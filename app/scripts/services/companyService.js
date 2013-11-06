'use strict';

// A service that handles interaction with our API for Companies.

angular.module('nhvioApp')
  .service('CompanyService', ['Restangular', '$q', function CompanyService(Restangular, $q) {

    // The Company list may be fetched multiple times,
    // but will unlikley change. Let's cache it in
    // the client so that browsing back and forth
    // is lickety-split.
    var cachedCompanyList = null;

    // Get a list of all users from the server
    var getCompanies = function(){
    	// Create a promise representing the result we'll return.
		var deferred = $q.defer();
        if (cachedCompanyList != null){
        		deferred.resolve(cachedCompanyList);
        }else{
            Restangular.one('companies').getList().then(function(Companies){
                cachedCompanyList = Companies;
                deferred.resolve(Companies);
        	});
        }
    	return deferred.promise;
    }

    // Get a list of all users from the server
    var getCompany = function(companyId){
        // Create a promise representing the result we'll return.
        var deferred = $q.defer();
        Restangular.one('companies', companyId).get().then(function(company){
            deferred.resolve(company);
        });
        return deferred.promise;
    }

    var clearCompanyList = function(){
        cachedCompanyList = null;
    }

    // Get a particular company, by id, from the server
    var removeCompanyById = function(companyId){
        
        // Create a promise representing the result we'll return.
        var deferred = $q.defer();
        Restangular.one('companies', companyId).remove().then(function(company){
            deferred.resolve(company);
        }, function(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
    var createCompany = function(company){
        var deferred = $q.defer();
        var base = Restangular.all('companies');
        base.post(company).then(function(company){
            console.log(company);
            deferred.resolve(company);
        }, function(err){
            deferred.reject(err);
        })
        return deferred.promise;
    }

    return {
        getCompany: getCompany,
    	getCompanies: getCompanies,
        clearCompanyList: clearCompanyList,
        removeCompanyById: removeCompanyById,
        createCompany: createCompany
    }
  }]);
