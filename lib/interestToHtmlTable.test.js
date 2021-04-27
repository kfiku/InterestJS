/* eslint-env jest */
const Interest = require('../lib/interest.js')
const interestToHtmlTable = require('../lib/interestToHtmlTable.js')

describe('interestToHtmlTable without params', function () {
  it('should render html with interest without params', function () {
    const interest = new Interest(1000, 5, 5)
    const html = interestToHtmlTable(interest)
    expect(html).toMatchSnapshot()
  })

  it('should render html with interest with startAmount param', function () {
    const interest = new Interest(1000, 5, 5, { startAmount: 1000 })
    const html = interestToHtmlTable(interest)
    expect(html).toMatchSnapshot()
  })

  it('should render html with interest with tax param', function () {
    const interest = new Interest(1000, 5, 5, { tax: 19 })
    const html = interestToHtmlTable(interest)
    expect(html).toMatchSnapshot()
  })
})

describe('interestToHtmlTable with formatMoney param', function () {
  it('should render html with formatMoney and interest without params', function () {
    const interest = new Interest(1000, 5, 5)
    const formatMoney = (num) => num.toFixed(0)
    const html = interestToHtmlTable(interest, { formatMoney })
    expect(html).toMatchSnapshot()
  })
})

describe('interestToHtmlTable with translations param', function () {
  it('should render html with translations and interest with tax param', function () {
    const interest = new Interest(1000, 5, 5, { tax: 19 })
    const translations = {
      Capital: 'Kapitał',
      Interest: 'Odsetki',
      Tax: 'Podatek',
      Sum: 'Suma'
    }
    const html = interestToHtmlTable(interest, { translations })
    expect(html).toMatchSnapshot()
  })
})
