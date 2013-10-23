'use strict';

// Takes an array and joins together the elements
// with commas
// 
angular.module('nhvioApp')
  .filter('niceList', function () {
    return function (input, lastAnd, lastAnd2) {
      var output = "",
          inputLen = input.length,
          lastAnd = (typeof lastAnd === "undefined") ? " & " : lastAnd
          lastAnd2 = (typeof lastAnd2 === "undefined") ? " & " : lastAnd2;

      if (inputLen == 0){
        return output;
      }
      for (var i = 0; i < inputLen; i++) {
        if (i == inputLen - 1){
          output += input[i]
        }else if (i == inputLen - 2){
          if (inputLen == 2) {
            output += input[i] + lastAnd2
          }else{
            output += input[i] + lastAnd
          };
        }else{
          output += input[i] + ", "
        }
      };
      return output;
    };
  });
