'use strict';

angular.module('nhvioApp')
  .directive('confirmClick', ['$window',
    function($window){
      return {
        priority: 100,
        restrict: 'A',
        link: function(scope, element, attrs){
          element.bind('click', function(e){
            var message = attrs.confirmClick || "Are you sure";
            if(!$window.confirm(message)){
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          });
        }
      }
    }
  ]);