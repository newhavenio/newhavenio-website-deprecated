'use strict';

angular.module('nhvioApp')
  .controller('CompanyEditCtrl', ['$scope', '$routeParams', '$window', 'UserService', 'CompanyService', 'LanguageService', '$location', function ($scope, $routeParams, $window, UserService, CompanyService, LanguageService, $location) {

    var setCompany = function(company){
        if (typeof company.languages === 'undefined') {
          company.languages = [];
        };
        if (typeof company.admin_ids === 'undefined') {
          company.admin_ids = [];
        };
        $scope.company = company;
    }

    // Note that, here we've got a callback on the promise instead
    // of directly using the value of the promise because we'd like
    // to enable two-way binding in the user-edit form.
    var wasNewlyRegistered = false;
    if (typeof $routeParams.companyId !== 'undefined') {
      CompanyService.getCompany($routeParams.companyId).then(function(company){
        setCompany(company);
      }, function(err){
        $location.path('/');
      });
    }else{
      var company = {isNew: true};
      setCompany(company);
    };

    LanguageService.getLanguages().then(function(languages){
      $scope.programmingLanguages = languages;
      console.log(languages);
    });

    // Grab the list of users
    UserService.getUsers().then(function(users){
      $scope.users = users;
    });

    $scope.range = function(min, max, step){
      step = (step == undefined) ? 1 : step;
      var input = [];
      for (var i=min; i<=max; i+=step){
        input.push(i);
      }
      return input;
    };
    $scope.logCompany = function(){
      console.log($scope.company);
    }

    // Remove the current user
    $scope.remove = function(){
      $scope.submitting = true;
      var finishUp = function(){
        $scope.submitting = false;
        $scope.company = null;
        CompanyService.clearAll();
        $window.location.href = '/companies';
      }
      if ($scope.company.isNew) {
        finishUp();
      }else{
        $scope.company.remove().then(finishUp, function(response) {
          $scope.submitting = false;
          alert('Error removing company!');
        })
      };

    }

    // Save the current company
    $scope.put = function(){
      console.log("submitting", $scope.company);
      $scope.submitting = true;
      if ($scope.company.isNew) {
        CompanyService.createCompany($scope.company).then(function(){
          $scope.submitting = false;
          CompanyService.clearAll();
          $location.path('/');
        }, function(response) {
          $scope.submitting = false;
          alert('Error saving!');
        })

      }else{
        $scope.company.put().then(function(){
          CompanyService.clearAll();
          $location.path('/');
          $scope.submitting = false;
        }, function(response) {
          $scope.submitting = false;
          alert('Error saving!');
        })
      }
    }
  }]);
