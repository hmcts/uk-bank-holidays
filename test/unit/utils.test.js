const { expect } = require('test/chai');
const { formatDate, isDateInList, bankHolidayList, validCountry, isStringDateCorrectFormat, isDateValid } = require('src/utils');
const moment = require('moment');

describe('utils', () => {

    describe('formatDate', () => {

        it('should return the formatted date if date passed is a string', () => {
            const formattedDate = formatDate('25-12-2018');
            expect(formattedDate).to.equal('2018-12-25');
        });

        it('should return the formatted date if date passed is a moment', () => {
            const formattedDate = formatDate(moment());
            expect(formattedDate).to.equal(moment().format('YYYY-MM-DD'));
        });

    });

    describe('isDateInList', () => {

        let list;

        before(() => {
           list = ['2018-12-25'];
        });

        it('should return true if date is in the list', () => {
            const dateInList = isDateInList(list, '2018-12-25');
            expect(dateInList).to.equal(true);
        });

        it('should return false if date is not in the list', () => {
            const dateInList = isDateInList(list, '2019-08-16');
            expect(dateInList).to.equal(false);
        });

    });

    describe('bankHolidayList', () => {

        let dates;

        before(() => {
            dates = {
                'england-and-wales': {
                    events: [{
                        date: '2018-12-25'
                    }, {
                        date: '2018-12-26'
                    }]
                },
                'northern-ireland': {
                    events: [{
                        date: '2018-10-02'
                    }]
                },
                scotland: {
                    events: [{
                        date: '2018-11-30'
                    }]
                }
            };
        });

        it('should return an array of dates from one country', () => {
            const list = bankHolidayList(dates, ['england-and-wales']);
            expect(list).to.eql(['2018-12-25', '2018-12-26']);
        });

        it('should return an array of dates from the array of countries passed', () => {
            const list = bankHolidayList(dates, ['england-and-wales', 'scotland']);
            expect(list).to.eql(['2018-12-25', '2018-12-26', '2018-11-30']);
        });

        it('should return an array of dates from the array of all countries passed', () => {
            const list = bankHolidayList(dates, ['england-and-wales', 'northern-ireland', 'scotland']);
            expect(list).to.eql(['2018-12-25', '2018-12-26', '2018-10-02', '2018-11-30']);
        });

    });

    describe('validCountry', () => {

        it('should return true if country is a valid UK country', () => {
            const valid = validCountry(['england-and-wales']);
            expect(valid).to.equal(true);
        });

        it('a', () => {
            const valid = validCountry(['england-and-wales', 'scotland']);
            expect(valid).to.equal(true);
        });

        it('should return false if country is not a valid UK country', () => {
            const valid = validCountry(['Brazil']);
            expect(valid).to.equal(false);
        });

        it('b', () => {
            const valid = validCountry(['scotland', 'Brazil']);
            expect(valid).to.equal(false);
        });

    });

    describe('isStringDateCorrectFormat', () => {

        it('should return null if date is empty string', () => {
            const valid = isStringDateCorrectFormat('');
            expect(valid).to.be.null;
        });

        it('should return null if date is an incorrect format', () => {
            const valid = isStringDateCorrectFormat('2-6-18');
            expect(valid).to.be.null;
        });

        it('should return null if date has / instead of -', () => {
            const valid = isStringDateCorrectFormat('02/06/2018');
            expect(valid).to.be.null;
        });

        it('should match date regex if correct formatted date', () => {
            const valid = isStringDateCorrectFormat('02-06-2018');
            expect(valid).to.not.be.null;
        });

    });

    describe('isDateValid', () => {

        it('should return true if a valid string date is passed', () => {
            const valid = isDateValid('25-12-2018');
            expect(valid).to.equal(true);
        });

        it('should return true if a valid moment date is passed', () => {
            const valid = isDateValid(moment());
            expect(valid).to.equal(true);
        });

        it('should return false if an invalid string date is passed', () => {
            const valid = isDateValid('30-02-2018');
            expect(valid).to.equal(false);
        });

        it('should return false if an invalid moment date is passed', () => {
            const valid = isDateValid(moment('30-02-2018', 'DD-MM-YYYY'));
            expect(valid).to.equal(false);
        });

    });

});
