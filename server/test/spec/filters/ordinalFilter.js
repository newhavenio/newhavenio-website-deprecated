'use strict';

describe('Filter: ordinal', function () {

  // load the filter's module
  beforeEach(module('nhvioApp'));

  // initialize a new instance of the filter before each test
  var ordinalFilter;
  beforeEach(inject(function ($filter) {
    ordinalFilter = $filter('ordinal');
  }));

  it('should return 1 as 1st...etc.:"', function () {
    var testCases = ['1st', '2nd', '3rd', '4th', '5th',
      '6th', '7th', '8th', '9th', '10th',
    ]
    for (var i = 0; i < testCases.length; i++) {
      expect(ordinalFilter(i+1)).toBe(testCases[i]);
    };
  });

});
