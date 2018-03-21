const { expect } = require('test/chai');
const { formatDate, isDateInList, bankHolidayList, validCountry } = require('src/utils');
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

    });

    describe('validCountry', () => {

        it('should return true if country is a valid UK country', () => {
            const valid = validCountry(['england-and-wales']);
            expect(valid).to.equal(true);
        });

        it('should return false if country is not a valid UK country', () => {
            const valid = validCountry(['Brazil']);
            expect(valid).to.equal(false);
        });

    });

});
