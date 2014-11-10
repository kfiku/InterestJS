'use strict';

var Interest  = require('../lib/interest.js');

var interest_1 = new Interest(1000, 12, 5, {tax:19});
console.log(interest_1);
// systematic savings over in 12 montchs with 5% interest rate and interest tax 19% (in poland we have 19%)

var interest_2 = new Interest(200, 360, 2.5);
console.log(interest_2);
// systematic savings over in 30 years with 5% interest rate
