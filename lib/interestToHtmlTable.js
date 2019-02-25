/*
 * LoanJS
 * Calculate compound interest
 * https://github.com/kfiku/InterestJS
 *
 * Copyright (c) 2014 Grzegorz Klimek
 * Licensed under the MIT license.
 */

(function () {
/**
 * Create Loan Object with all instalments and sum of interest
 * @param {Loan}    loan     loan object
 * @param {object}  params   params
 *
 * @return {string}       html string with table
 */
  var interestToHtmlTable = function (interest, params) {
    'use strict'
    params = params || {}
    params.formatMoney = params.formatMoney || function (num) {
      return num.toFixed(2)
    }
    var
      fm = params.formatMoney

    var trans = function (key) {
      if (params.translations && params.translations[key]) {
        return params.translations[key]
      } else {
        return key
      }
    }

    var html = [
      '<table>\n' +
        '<thead>\n' +
          '<tr>\n' +
            '<th></th>\n' +
            '<th>' + trans('Capital') + '</th>\n' +
            '<th>' + trans('Interest') + '</th>\n' +
          ((interest.taxSum)
            ? '<th>' + trans('Tax') + '</th>\n' : '') +
            '<th>' + trans('Sum') + '</th>\n' +
          '</tr>\n' +
        '</thead>\n' +
        '<tbody>\n',
      '', // body content [1]
      '</tbody>\n' +
      '</table>\n'
    ]

    for (var i = 0; i < interest.payments.length; i++) {
      var p = interest.payments[i]

      var pHtml =
          '<tr>\n' +
            '<td>' + (i + 1) + '</td>\n' +
            '<td>' + fm(p.capitalSum) + '</td>\n' +
            '<td>' + fm(p.interest) + '</td>\n' +
          ((p.tax)
            ? '<td>' + fm(p.tax) + '</td>\n' : '') +
            '<td>' + fm(p.sum) + '</td>\n' +
          '</tr>\n'
      html[1] += pHtml
    }

    html[1] +=
    '<tr>\n' +
      '<td>' + trans('Sum') + '</td>\n' +
      '<td>' + fm(interest.capitalSum) + '</td>\n' +
      '<td>' + fm(interest.interestSum) + '</td>\n' +
    ((interest.taxSum)
      ? '<td>' + fm(interest.taxSum) + '</td>\n' : '') +
      '<td>' + fm(interest.sum) + '</td>\n' +
    '</tr>\n'

    return html.join('')
  }

  /* istanbul ignore next */
  if (typeof module === 'undefined') {
    // browser
    if (typeof LOANJS_NAMESPACE === 'object') {
      INTERESTJS_NAMESPACE.interestToHtmlTable = interestToHtmlTable // eslint-disable-line no-undef
    } else {
      window.interestToHtmlTable = interestToHtmlTable
    }
  } else {
    // node or browserfy
    module.exports = interestToHtmlTable
  }
}())
