'use strict';

angular.module('nhvioApp')
  .controller('AdminCtrl', ['$scope', '$routeParams', '$window', 'UserService', 'CompanyService', 'LanguageService', function ($scope, $routeParams, $window, UserService, CompanyService, LanguageService) {

    // Grab the list of companies
    CompanyService.getCompanies().then(function(companies){
      $scope.companies = companies;
    });

    // Grab the list of users
    UserService.getUsers().then(function(users){
      $scope.users = users;
    });

    // Grab the list of users
    UserService.getMe().then(function(me){
      if (typeof me === 'undefined' || me.roles.indexOf('admin') === -1) {
        $window.location.href = '/';
      };
      $scope.me = me;

    });

    // Grab the list of languages
    LanguageService.getLanguages().then(function(languages){
      $scope.programmingLanguages = languages;
    });

    $scope.activeTab = 'developers';

    $scope.removeUser = function(userId){
      var userIndex = _.findIndex($scope.users, function(user){
        return user._id == userId;
      })
      var user = $scope.users[userIndex];
      console.log(user);
      UserService.removeUserById(userId).then(function(){
        // Remove the user from the list of users
        $scope.users.splice(userIndex, 1);
      }, function(err){
        alert(err.data);
      })
    }

    $scope.removeCompany = function(companyId){
      var companyIndex = _.findIndex($scope.companies, function(company){
        return company._id == companyId;
      })
      var company = $scope.companies[companyIndex];
      CompanyService.removeCompanyById(companyId).then(function(){
        // Remove the company from the list of companies
        $scope.companies.splice(companyIndex, 1);
      }, function(err){
        alert(err.data);
      })
    }

  }]);
