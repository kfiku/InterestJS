"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';
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
    var Interest = function Interest(singleAmount, months, interestRate, params) {
      if (!singleAmount || singleAmount <= 0 || !months || months <= 0 || !interestRate || typeof interestRate !== 'number' || interestRate <= 0 || params && _typeof(params) !== 'object') {
        throw new Error('wrong parameters (' + JSON.stringify(singleAmount) + ', ' + JSON.stringify(months) + ', ' + JSON.stringify(interestRate) + ', ' + JSON.stringify(params) + ')');
      } // defaults


      params = _typeof(params) === 'object' ? params : {};
      params.startAmount = params.startAmount !== undefined ? params.startAmount : 0;
      params.tax = params.tax !== undefined ? params.tax : 0;
      params.contrib = params.contrib !== undefined ? params.contrib : 0;
      params.dynamicAmount = typeof params.dynamicAmount === 'function' ? params.dynamicAmount : function () {
        return singleAmount;
      };
      var payments = [];
      var interestSum = 0;
      var capitalSum = 0;
      var taxSum = 0;
      var contributions = 0;
      var sum = params.startAmount;
      var singleInterest = interestRate / 12 / 100;
      var i = 0;
      var p;

      var rnd = function rnd(num) {
        return Math.round(num * 100) / 100;
      };

      var getNextPayment = function getNextPayment(i) {
        var capital = params.dynamicAmount(i);
        var contribs = params.contrib;
        var interest = rnd((capital + sum + contribs) * singleInterest);
        var tax = rnd(interest * (params.tax / 100));
        return {
          capital: capital,
          interest: interest,
          tax: tax,
          contrib: contribs,
          capitalSum: capitalSum + capital + contribs,
          sum: rnd(sum + capital + contribs + interest - tax)
        };
      };

      for (i; i < months; i++) {
        p = getNextPayment(i);
        sum = p.sum;
        capitalSum = p.capitalSum;
        interestSum += p.interest;
        taxSum += p.tax;
        contributions += p.contrib;
        payments.push(p);
      }

      return {
        payments: payments,
        interestSum: rnd(interestSum),
        capitalSum: rnd(capitalSum),
        contributions: contributions,
        taxSum: taxSum,
        sum: sum
      };
    };
    /* istanbul ignore next */


    if (typeof module === 'undefined') {
      // browser
      if ((typeof INTERESTJS_NAMESPACE === "undefined" ? "undefined" : _typeof(INTERESTJS_NAMESPACE)) === 'object') {
        INTERESTJS_NAMESPACE.Interest = Interest; // eslint-disable-line no-undef
      } else {
        window.Interest = Interest;
      }
    } else {
      // node or browserfy
      module.exports = Interest;
    }
  })();
})();
