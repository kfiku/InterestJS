/* eslint-env jest */
'use strict'
var assert = require('assert')
var Interest = require('../lib/interest.js')

describe('interestjs node module.', function () {
  it('must count interest correctly', function () {
    var interest = new Interest(1000, 12, 5, { tax: 19 })
    var taxSum = 0
    var interestSum = 0
    var p
    var i = 0

    assert.strictEqual(interest.payments.length, 12, 'payments are not equal to 120')
    for (i; i < interest.payments.length; i++) {
      p = interest.payments[i]
      assert(p.capital > 0, true)
      assert(p.interest > 0, true)
      assert(p.tax > 0, true)

      taxSum += p.tax
      interestSum += p.interest
    }

    assert(interest.interestSum > 0, true, 'wrong interestSum')
    assert.strictEqual(interest.interestSum, interestSum,
      'interestsSum (' + interest.interestSum + ') not exual to sum of all interests (' + interestSum + ') in payments array')
    assert.strictEqual(interest.taxSum, taxSum,
      'taxSum (' + interest.taxSum + ') not exual to taxSum of all taxes (' + taxSum + ') in payments array')
  })
  it('must count interest correctly for dynamic amount', function () {
    var interest = new Interest(1000, 12, 5, {
      tax: 19,
      dynamicAmount: function (i) {
        return 100 + i * 10
      }
    })

    var taxSum = 0
    var interestSum = 0
    var p
    var i = 0

    assert.strictEqual(interest.payments.length, 12, 'payments are not equal to 120')
    for (i; i < interest.payments.length; i++) {
      p = interest.payments[i]
      assert(p.capital > 0, true)
      assert(p.interest > 0, true)
      assert(p.tax > 0, true)

      taxSum += p.tax
      interestSum += p.interest
    }

    assert(interest.interestSum > 0, true, 'wrong interestSum')
    assert.strictEqual(interest.interestSum, interestSum,
      'interestsSum (' + interest.interestSum + ') not exual to sum of all interests (' + interestSum + ') in payments array')
    assert.strictEqual(interest.taxSum, taxSum,
      'taxSum (' + interest.taxSum + ') not exual to taxSum of all taxes (' + taxSum + ') in payments array')
  })
})
