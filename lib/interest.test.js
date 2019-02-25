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

    assert.strictEqual(interest.payments.length, 12, 'payments are not equal to 12')
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

  it('should count without params', function () {
    const interest = new Interest(1000, 12, 5)
    expect(interest.sum).toBe(12330.01)
    expect(interest).toMatchSnapshot()
  })

  it('should count with startAmount param', function () {
    const interest = new Interest(1000, 12, 5, { startAmount: 1000 })
    expect(interest.sum).toBe(13381.16)
    expect(interest).toMatchSnapshot()
  })

  it('should count with tax param', function () {
    const interest = new Interest(1000, 12, 5, { tax: 19 })
    expect(interest.sum).toBe(12266.53)
    expect(interest).toMatchSnapshot()
  })

  it('should count with tax param', function () {
    const interest = new Interest(1000, 12, 5, { contrib: 100 })
    expect(interest.sum).toBe(13563.03)
    expect(interest).toMatchSnapshot()
  })

  it('should count with dynamicAmount param', function () {
    const dynamicAmount = (i) => {
      return 100 + i * 10
    }
    const interest = new Interest(1000, 12, 5, { dynamicAmount })
    expect(interest.sum).toBe(1905.04)
    expect(interest).toMatchSnapshot()
  })

  it('shout throw on wrong params', function () {
    expect(() => Interest(20000, 'asd')).toThrowError('wrong parameters (20000, "asd", undefined, undefined)')
    expect(() => Interest(1000, 12, '5')).toThrowError('wrong parameters (1000, 12, "5", undefined)')
    expect(() => Interest(1000, 12, 5, true)).toThrowError('wrong parameters (1000, 12, 5, true)')
  })
})
