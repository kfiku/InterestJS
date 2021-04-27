/*
 * InterestJS
 * Calculate compound interest
 * https://github.com/kfiku/InterestJS
 *
 * Copyright (c) 2014 Grzegorz Klimek
 * Licensed under the MIT license.
 */

(function () {
/**
 * Create Interest Object
 * @param {number} amount                   full amount of Loan
 * @param {number} installmentsNumber       how meny installments will be
 * @param {number} interestRate             interest rate in percent (3.5)
 * @param {[bool]} diminishingInstallments  if installments will be
 *                                          diminishing (true) or
 *                                          equal/annuity (false)
 *
 * @return {object} {
 *                    payments  : [
 *                      {
 *                        capital: number,
 *                        interest: number,
 *                        tax: number,
 *                        capitalSum: number,
 *                        sum: number
 *                      }
 *                    ],
 *                    interestSum   : number,
 *                    capitalSum    : number,
 *                    taxSum        : number,
 *                    sum           : number
 *                  }
 */
  const Interest = function (singleAmount, months, interestRate, params) {
    'use strict'
    if (
      !singleAmount || singleAmount <= 0 ||
      !months || months <= 0 ||
      !interestRate || typeof interestRate !== 'number' || interestRate <= 0 ||
      (params && typeof params !== 'object')
    ) {
      throw new Error(
        'wrong parameters (' +
          JSON.stringify(singleAmount) + ', ' +
          JSON.stringify(months) + ', ' +
          JSON.stringify(interestRate) + ', ' +
          JSON.stringify(params) +
        ')'
      )
    }

    // defaults
    params = typeof params === 'object' ? params : {}
    params.startAmount = params.startAmount !== undefined ? params.startAmount : 0
    params.tax = params.tax !== undefined ? params.tax : 0
    params.contrib = params.contrib !== undefined ? params.contrib : 0
    params.dynamicAmount = typeof params.dynamicAmount === 'function' ? params.dynamicAmount : function () { return singleAmount }

    const payments = []
    let interestSum = 0
    let capitalSum = 0
    let taxSum = 0
    let contributions = 0
    let sum = params.startAmount
    const singleInterest = interestRate / 12 / 100
    let i = 0
    let p
    const rnd = function (num) {
      return Math.round(num * 100) / 100
    }

    const getNextPayment = function (i) {
      const capital = params.dynamicAmount(i)
      const contribs = params.contrib
      const interest = rnd((capital + sum + contribs) * (singleInterest))
      const tax = rnd(interest * (params.tax / 100))

      return {
        capital: capital,
        interest: interest,
        tax: tax,
        contrib: contribs,
        capitalSum: capitalSum + capital + contribs,
        sum: rnd(sum + capital + contribs + interest - tax)
      }
    }

    for (i; i < months; i++) {
      p = getNextPayment(i)

      sum = p.sum
      capitalSum = p.capitalSum
      interestSum += p.interest
      taxSum += p.tax
      contributions += p.contrib

      payments.push(p)
    }

    return {
      payments: payments,
      interestSum: rnd(interestSum),
      capitalSum: rnd(capitalSum),
      contributions: contributions,
      taxSum: taxSum,
      sum: sum
    }
  }

  /* istanbul ignore next */
  if (typeof module === 'undefined') {
  // browser
    if (typeof INTERESTJS_NAMESPACE === 'object') {
      INTERESTJS_NAMESPACE.Interest = Interest // eslint-disable-line no-undef
    } else {
      window.Interest = Interest
    }
  } else {
  // node or browserfy
    module.exports = Interest
  }
}())
