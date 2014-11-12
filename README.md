# InterestJS [![NPM version](https://badge.fury.io/js/interestjs.png?style=flat)](http://badge.fury.io/js/interestjs) [![Build Status](https://travis-ci.org/kfiku/InterestJS.svg)](https://travis-ci.org/kfiku/InterestJS) [![Dependency Status](https://david-dm.org/kfiku/InterestJS/dev-status.svg)](https://david-dm.org/kfiku/interestjs)

> Calculate compound interest in js (browser/node.js/browserify).


## Getting Started

Install the module with: `npm install interestjs`

```js
var Interest = require('interestjs');
var inst     = Interest(singleAmount, months, interestRate, params);

// returns
{ 
  payments  : [
    {
      capital: number,
      intrest: number,
      tax: number,
      capitalSum: number,
      sum: number
    }
  ],
  interestSum   : number,
  capitalSum    : number,
  taxSum        : number,
  sum           : number
}
```


```sh
# creates a browser.js
$ grunt browserify
```



## Documentation

Interest(singleAmount, months, interestRate, params)

### Arguments
| Argument           | type   | default   | Description
| ------------------ | ------ | --------- | ------------------
| singleAmount       | number | *required | single saving amount (monthly)
| months             | number | *required | months of savings
| interestRate       | number | *required | interest rate in percent (ex. 3.5)
| params             | object | undefined | parameters

#### Params object
* tax - persentage tax on interest
* dynamicAmount - function for getting next amount of savings
* startAmount - amount of money put at the begining

### Returns
```js
{ 
  installments  : [
    {
      capital     : number,
      intrest     : number,
      installment : number,
      remain      : number
    }
  ],
  amount        : number,
  interestSum   : number,
  capitalSum    : number,
  sum           : number
}
```

## Examples

nodejs / browserify example
```js

var Interest  = require('../lib/interest.js');

var interest_1 = new Interest(1000, 12, 5, {tax:19});
console.log(interest_1);
// systematic savings over in 12 montchs with 5% interest rate and interest tax 19% (in poland we have 19%)

```

Browser example:
```html
<script src="../../lib/interest.js"></script>
<script>
    var interest_1 = new Interest(1000, 12, 5, {tax:19});
</script>
```

more examples [here](https://github.com/kfiku/InterestJS/tree/master/example)

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com).


## Release History

#### 2014-11-10 v0.0.1
 * add dynamic amount param to have controll of every saving
 
#### 2014-11-10 v0.0.1
 * init commit



## License

Copyright (c) 2014 Grzegorz Klimek  
Licensed under the MIT license.
