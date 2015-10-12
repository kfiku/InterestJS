/*global describe,it*/
'use strict';
var assert    = require('assert'),
    Interest  = require('../lib/interest.js');

describe('interestjs node module.', function() {
  it('must count interest correctly', function() {
    var interest = new Interest(1000, 12, 5, {tax:19}),
        taxSum = 0,
        interestSum = 0,
        p, i = 0;

    assert.equal(interest.payments.length, 12, 'payments are not equal to 120');
    for (i; i < interest.payments.length; i++) {
      p = interest.payments[i];
      assert(p.capital > 0, true);
      assert(p.interest > 0, true);
      assert(p.tax > 0, true);

      taxSum += p.tax;
      interestSum += p.interest;
    }

    assert(interest.interestSum > 0, true, 'wrong interestSum');
    assert.equal(interest.interestSum, interestSum,
                'interestsSum ('+interest.interestSum+') not exual to sum of all interests ('+interestSum+') in payments array');
    assert.equal(interest.taxSum, taxSum,
                'taxSum ('+interest.taxSum+') not exual to taxSum of all taxes ('+taxSum+') in payments array');

  });
  it('must count interest correctly for dynamic amount', function() {
    var interest = new Interest(1000, 12, 5, {tax:19, dynamicAmount: function (i) {
          return 100 + i*10;
        }}),
        taxSum = 0,
        interestSum = 0,
        p, i = 0;

    assert.equal(interest.payments.length, 12, 'payments are not equal to 120');
    for (i; i < interest.payments.length; i++) {
      p = interest.payments[i];
      assert(p.capital > 0, true);
      assert(p.interest > 0, true);
      assert(p.tax > 0, true);

      taxSum += p.tax;
      interestSum += p.interest;
    }

    assert(interest.interestSum > 0, true, 'wrong interestSum');
    assert.equal(interest.interestSum, interestSum,
                'interestsSum ('+interest.interestSum+') not exual to sum of all interests ('+interestSum+') in payments array');
    assert.equal(interest.taxSum, taxSum,
                'taxSum ('+interest.taxSum+') not exual to taxSum of all taxes ('+taxSum+') in payments array');

  });
});
