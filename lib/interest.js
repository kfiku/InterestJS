/*
 * InterestJS
 * Calculate compound interest
 * https://github.com/kfiku/InterestJS
 *
 * Copyright (c) 2014 Grzegorz Klimek
 * Licensed under the MIT license.
 */

(function() {
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
*                        intrest: number,
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
var Interest = function (singleAmount, months, interestRate, params) {
  'use strict';
  if(!singleAmount || singleAmount <= 0 ||
     !months || months <= 0 ||
     !interestRate || interestRate <= 0 ) {
    throw 'wrong parameters (' +
          [singleAmount, months, interestRate, params].join(', ') +
          ')';
  }

  // defaults
  params = typeof params === 'object' ? params : {};
  params.startAmount = params.startAmount !== undefined ? params.startAmount : 0;
  params.tax         = params.tax !== undefined         ? params.tax         : 0;
  params.dynamicAmount  = typeof params.dynamicAmount === 'function'? params.dynamicAmount : function () { return singleAmount; };

  var payments = [],
      interestSum   = 0,
      capitalSum    = 0,
      taxSum        = 0,
      sum           = params.startAmount,
      singleIntrest = interestRate / 12 / 100,

      i = 0,
      p,

      rnd = function (num) {
        return Math.round(num*100)/100;
      },

      getNextPayment = function(i) {
        var capital = params.dynamicAmount(i),
            intrest = rnd((capital + sum) * (singleIntrest)),
            tax     = rnd(intrest * (params.tax/100));

        return {
          capital: capital,
          intrest: intrest,
          tax: tax,
          capitalSum: capitalSum + capital,
          sum: rnd(sum + capital + intrest - tax)
        };
      };

  for (i; i < months; i++) {
    p = getNextPayment(i);

    sum          = p.sum;
    capitalSum   = p.capitalSum;
    interestSum += p.intrest;
    taxSum      += p.tax;

    payments.push(p);
  }

  return {
    payments      : payments,
    interestSum   : rnd(interestSum),
    capitalSum    : rnd(capitalSum),
    taxSum        : taxSum,
    sum           : sum
  };
};

if(typeof module === 'undefined') {
  // browser
  if(typeof INTERESTJS_NAMESPACE === 'object') {
    INTERESTJS_NAMESPACE.Interest = Interest;
  } else {
    window.Interest = Interest;
  }
} else {
  // node or browserfy
  module.exports = Interest;
}

}());
