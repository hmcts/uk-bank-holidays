const { expect } = require('test/chai');
const UkBankHolidays = require('src');
const moment = require('moment');
const nock = require('nock');

describe('ukBankHolidays', () => {

    let countries;
    let ukBankHolidays;
    let apiResponse = {};

    countries = {
        eaw: 'england-and-wales',
        ni: 'northern-ireland',
        sct: 'scotland'
    };

    apiResponse[countries.eaw] = {
        events: [{
            date: '2018-12-25'
        }]
    };
    apiResponse[countries.sct] = {
        events: [{
            date: '2018-01-01'
        }]
    };

    describe('constructor', () => {

        it('should throw an error if countries not passed', () => {
            ukBankHolidays = () => new UkBankHolidays();
            expect(ukBankHolidays).to.throw(Error, 'Countries not passed');
        });

        it('should throw an error if countries is not an array', () => {
            ukBankHolidays = () => new UkBankHolidays(countries.eaw);
            expect(ukBankHolidays).to.throw(Error, 'Countries must be an array');
        });

        it('should throw an error if invalid country passed', () => {
            ukBankHolidays = () => new UkBankHolidays(['invalidCountry']);
            expect(ukBankHolidays).to.throw(Error, 'Country not on the list');
        });

        it('should set countries', () => {
            ukBankHolidays = new UkBankHolidays([countries.sct]);
            expect(ukBankHolidays.countries).to.eql([countries.sct]);
        });

    });

    describe('loadBankHolidayDates', () => {

        let api;
        let bankHolidayDates;
        let loadDates;

        before(() => {
            ukBankHolidays = new UkBankHolidays([countries.eaw]);
            bankHolidayDates = ['2018-12-25'];
        });

        it('rejects the promise an error is caught when sending a request to the api', async () => {
            const error = { value: 500, reasons: 'server error', response: undefined };
            api = nock('https://www.gov.uk')
                .get('/bank-holidays.json')
                .replyWithError(error);

            await ukBankHolidays.loadBankHolidayDates(error => {
                expect(error).to.eql(error)
            });
        });

        it('resolves the promise if bankHolidayDates hasn\'t been set but request was successful', async () => {
            api = nock('https://www.gov.uk')
                .get('/bank-holidays.json')
                .reply(200, apiResponse);

            loadDates = await ukBankHolidays.loadBankHolidayDates();
            expect(loadDates).to.eql(bankHolidayDates)
        });

        it('resolves the promise if bankHolidayDates has already been set', async () => {
            ukBankHolidays.bankHolidayDates = bankHolidayDates;
            loadDates = await ukBankHolidays.loadBankHolidayDates();
            expect(loadDates).to.eql(bankHolidayDates)
        });

    });

    describe('isDateABankHoliday', () => {

        let isDateInList;

        before(() => {
            ukBankHolidays = new UkBankHolidays([countries.eaw]);
            ukBankHolidays.bankHolidayDates = ['2018-12-25'];
        });

        it('should return true if date is a string and in the list', () => {
            isDateInList = ukBankHolidays.isDateABankHoliday('25-12-2018');
            expect(isDateInList).to.equal(true);
        });

        it('should return false if date is a string but not in the list', () => {
            isDateInList = ukBankHolidays.isDateABankHoliday('31-08-2018');
            expect(isDateInList).to.equal(false);
        });

        it('should return true if date is a moment and in the list', () => {
            isDateInList = ukBankHolidays.isDateABankHoliday(moment('25-12-2018', 'DD-MM-YYYY'));
            expect(isDateInList).to.equal(true);
        });

        it('should return false if date is a moment but not in the list', () => {
            isDateInList = ukBankHolidays.isDateABankHoliday(moment('31-08-2018', 'DD-MM-YYYY'));
            expect(isDateInList).to.equal(false);
        });

        it('should throw an error if date is not correct format', () => {
            isDateInList = () => ukBankHolidays.isDateABankHoliday('2018-12-25');
            expect(isDateInList).to.throw(Error, 'Date is an incorrect format. Must be in DD-MM-YYYY format');
        });

        it('should throw an error if date is an empty string', () => {
            isDateInList = () => ukBankHolidays.isDateABankHoliday('');
            expect(isDateInList).to.throw(Error, 'Date is an incorrect format. Must be in DD-MM-YYYY format');
        });

        it('should throw an error if date is not valid', () => {
            isDateInList = () => ukBankHolidays.isDateABankHoliday('30-02-2018');
            expect(isDateInList).to.throw(Error, 'Date passed is an invalid date');
        });

    });

});
