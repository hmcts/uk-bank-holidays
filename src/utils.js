const { includes, flatten } = require('lodash');
const moment = require('moment');
const ukCountries = [
    'england-and-wales',
    'northern-ireland',
    'scotland'
];
const dateRegex = /(\d{2})-(\d{2})-(\d{4})/;

const formatDate = date => {
    // format the date to YYYY-MM-DD to match the way it looks in the bank holidays JSON
    return typeof date === 'string' ? moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD') : date.format('YYYY-MM-DD');
};

const isDateInList = (dateList, date) => {
    return includes(dateList, date);
};

const bankHolidayList = (dates, countries) => {
    let dateList = [];

    countries.forEach(country => {
        const countryDates = dates[country].events.map(event => event.date);
        dateList.push(countryDates);
    });

    return flatten(dateList);
};

const validCountry = countries => {

    let valid = true;

    valid = countries.every(country => {
       return includes(ukCountries, country);
    });

    return valid;
};

const isStringDateCorrectFormat = date => {

    return date.match(dateRegex);
};

const isDateValid = date => {

    let valid;

    if (typeof date === 'string') {
        valid = moment(date, 'DD-MM-YYYY').isValid()
    } else {
        valid = date.isValid();
    }

    return valid;
};

module.exports = { formatDate, isDateInList, bankHolidayList, validCountry, isStringDateCorrectFormat, isDateValid };
