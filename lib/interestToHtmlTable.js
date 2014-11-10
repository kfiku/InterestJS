/*
 * LoanJS
 * Calculate compound interest
 * https://github.com/kfiku/InterestJS
 *
 * Copyright (c) 2014 Grzegorz Klimek
 * Licensed under the MIT license.
 */

(function() {
/**
 * Create Loan Object with all instalments and sum of interest
 * @param {Loan}    loan     loan object
 * @param {object}  params   params
 *
 * @return {string}       html string with table
 */
var interestToHtmlTable = function (interest, params) {
  'use strict';
  params = params || {};
  params.formatMoney = params.formatMoney || function (num) {
    return num.toFixed(2);
  };
  var
    fm = params.formatMoney,
    trans = function (key) {
      if(params.translations && params.translations[key]) {
        return params.translations[key];
      } else {
        return key;
      }
    },
    html = [
      '<table>' +
        '<thead>' +
          '<tr>' +
            '<th></th>' +
            '<th>' + trans('Capital') + '</th>' +
            '<th>' + trans('Intrest') + '</th>' +
          ((interest.taxSum) ?
            '<th>' + trans('Tax') + '</th>' : '') +
            '<th>' + trans('Sum') + '</th>' +
          '</tr>' +
        '</thead>'+
        '<tbody>',
          '',  // body content [1]
        '</tbody>' +
      '</table>'
    ];

  console.log(interest);

  for (var i = 0; i < interest.payments.length; i++) {
    var p = interest.payments[i],
        pHtml =
          '<tr>' +
            '<td>' + (i+1) + '</td>' +
            '<td>' + fm(p.capitalSum) + '</td>' +
            '<td>' + fm(p.intrest) + '</td>' +
          ((p.tax) ?
            '<td>' + fm(p.tax) + '</td>' : '') +
            '<td>' + fm(p.sum) + '</td>' +
          '</tr>';
    html[1] += pHtml;
  }

  html[1] +=
    '<tr>' +
      '<td>' + trans('Sum') + '</td>' +
      '<td>' + fm(interest.capitalSum) + '</td>' +
      '<td>' + fm(interest.interestSum) + '</td>' +
    ((interest.taxSum) ?
      '<td>' + fm(interest.taxSum) + '</td>' : '') +
      '<td>' + fm(interest.sum) + '</td>' +
    '</tr>';

  return html.join('');
};

if(typeof module !== 'undefined') {
    module.exports = interestToHtmlTable;
}
if(typeof module === 'undefined') {
  // browser
  if(typeof LOANJS_NAMESPACE === 'object') {
    INTERESTJS_NAMESPACE.interestToHtmlTable = interestToHtmlTable;
  } else {
    window.interestToHtmlTable = interestToHtmlTable;
  }
} else {
  // node or browserfy
  module.exports = interestToHtmlTable;
}

}());
