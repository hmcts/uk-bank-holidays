const {
  formatDate,
  isDateInList,
  bankHolidayList,
  validCountry,
  isStringDateCorrectFormat,
  isDateValid
} = require('./utils');
const request = require('superagent');
const NodeCache = require('node-cache');

const oneWeek = 604800;
const myCache = new NodeCache({
  stdTTL: process.env.UK_BANK_HOLIDAYS_CACHE_AGE || oneWeek
});

class UKBankHolidays {
  constructor(countries) {
    if (!countries) {
      throw new Error('Countries not passed');
    }

    if (!Array.isArray(countries)) {
      throw new Error('Countries must be an array');
    }

    if (!validCountry(countries)) {
      throw new Error('Country not on the list');
    }

    this.countries = countries;
  }

  async load() {
    if (this.bankHolidayDates) {
      return this.bankHolidayDates;
    }

    try {
      const bankHolidays = await request.get('https://www.gov.uk/bank-holidays.json');
      this.bankHolidayDates = bankHolidayList(bankHolidays.body, this.countries);
    } catch (error) {
      throw error;
    }

    return this.bankHolidayDates;
  }

  isDateABankHoliday(date) {
    if (typeof date === 'string' && !isStringDateCorrectFormat(date)) {
      throw new Error('Date is an incorrect format. Must be in DD-MM-YYYY format');
    }

    if (!isDateValid(date)) {
      throw new Error('Date passed is an invalid date');
    }

    return isDateInList(this.bankHolidayDates, formatDate(date));
  }

  get countries() {
    return this._countries;
  }

  set countries(countries) {
    this._countries = countries;
  }

  get bankHolidayDates() {
    return myCache.get('bankHolidayDates');
  }

  set bankHolidayDates(bankHolidayDates) {
    myCache.set('bankHolidayDates', bankHolidayDates);
  }
}

module.exports = UKBankHolidays;
