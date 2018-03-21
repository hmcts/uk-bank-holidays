const { formatDate, isDateInList, bankHolidayList, validCountry } = require('./utils');
const request = require('superagent');

const isDateABankHoliday = async function(date, countries) {

    if (!date && !countries) {
        throw new Error('No arguments passed');
    }

    if (!countries) {
        throw new Error('Countries not passed');
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
