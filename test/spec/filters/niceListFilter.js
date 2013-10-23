'use strict';

describe('Filter: niceListFilter', function () {

  // load the filter's module
  beforeEach(module('nhvioApp'));

  // initialize a new instance of the filter before each test
  var niceListFilter;
  beforeEach(inject(function ($filter) {
    niceListFilter = $filter('niceList');
  }));

  it('should return the input prefixed with "niceListFilter filter:"', function () {
    var text = 'angularjs';
    expect(niceListFilter(text)).toBe('niceListFilter filter: ' + text);
  });

});
