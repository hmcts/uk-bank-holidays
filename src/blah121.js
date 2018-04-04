const { formatDate, isDateInList, bankHolidayList, validCountry, isStringDateCorrectFormat, isDateValid } = require('./utils');
const request = require('superagent');

const isDateABankHoliday = async function(date, countries) {

    if (!date && !countries) {
        throw new Error('No arguments passed');
    }

    if (typeof date === 'string' && !isStringDateCorrectFormat(date)) {
        throw new Error('Date is an incorrect format. Must be in DD-MM-YYYY format');
    }

    if (!isDateValid(date)) {
        throw new Error('Date passed is an invalid date');
    }

    if (!countries) {
        throw new Error('Countries not passed');
    }

    if (!Array.isArray(countries)) {
        throw new Error('Countries must be an array');
    }

    if (!validCountry(countries)) {
        throw new Error('Country not on the list');
    }

    date = formatDate(date);

    try {
        const bankHolidays = await request.get('https://www.gov.uk/bank-holidays.json');
        const bankHolidayDates = bankHolidayList(bankHolidays.body, countries);
        return isDateInList(bankHolidayDates, date);
    } catch (err) {
        throw new Error(err);
    }

};

module.exports = isDateABankHoliday;
