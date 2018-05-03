const { includes, flatten } = require('lodash');
const moment = require('moment');

const ukCountries = [
  'england-and-wales',
  'northern-ireland',
  'scotland'
];
const dateRegex = /(\d{2})-(\d{2})-(\d{4})/;

const isDateInList = (dateList, date) => includes(dateList, date);
const validCountry = countries => countries.every(country => includes(ukCountries, country));
const isStringDateCorrectFormat = date => date.match(dateRegex);

const bankHolidayList = (dates, countries) => {
  const dateList = countries.map(country => dates[country].events.map(event => event.date));
  return flatten(dateList);
};

const formatDate = date => {
  // format the date to YYYY-MM-DD to match the way it looks in the bank holidays JSON
  let formattedDate = null;
  if (typeof date === 'string') {
    formattedDate = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
  } else {
    formattedDate = date.format('YYYY-MM-DD');
  }
  return formattedDate;
};


const isDateValid = date => {
  let valid = null;
  if (typeof date === 'string') {
    valid = moment(date, 'DD-MM-YYYY').isValid();
  } else {
    valid = date.isValid();
  }
  return valid;
};

module.exports = {
  formatDate,
  isDateInList,
  bankHolidayList,
  validCountry,
  isStringDateCorrectFormat,
  isDateValid
};
