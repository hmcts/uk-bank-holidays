const {
    formatDate,
    isDateInList,
    bankHolidayList,
    validCountry,
    isStringDateCorrectFormat,
    isDateValid
} = require('./utils');
const request = require('superagent');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({
    stdTTL: 60
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

    async loadBankHolidayDates() {
        if(this.bankHolidayDates) {
            console.log('dates')
            Promise.resolve();
        } else {
            console.log('no dates')
            try {
                const bankHolidays = await request.get('https://www.gov.uk/bank-holidays.json');
                this.bankHolidayDates = bankHolidayList(bankHolidays.body, this.countries);
            } catch (err) {
                throw new Error(err);
            }

        }
    }

    isDateInList(date) {

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
        this._countries = countries
    }

    get bankHolidayDates() {
        return myCache.get('meow');
    }

    set bankHolidayDates(bankHolidayDates) {
        myCache.set('meow', bankHolidayDates);
    }
}

module.exports = UKBankHolidays;
