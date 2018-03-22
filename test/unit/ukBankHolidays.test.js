const { expect } = require('test/chai');
const ukBankHolidays = require('src');
const moment = require('moment');

describe('ukBankHolidays', () => {

    let countries;

    describe('england-and-wales', () => {

        before(() => {
           countries =  ['england-and-wales'];
        });

        it('returns true when date is on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('25-12-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('scotland', () => {

        before(() => {
            countries =  ['scotland'];
        });

        it('returns true when date is on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('30-11-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('northern-ireland', () => {

        before(() => {
            countries =  ['northern-ireland'];
        });

        it('returns true when date is on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('12-07-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not on a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('england-and-wales and scotland', () => {

        before(() => {
            countries =  ['england-and-wales', 'scotland'];
        });

        it('returns true when date is a scottish bank holiday but not english or welsh', async function() {
            const isBankHoliday = await ukBankHolidays('30-11-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns true when date is an english and welsh bank holiday but scottish', async function() {
            const isBankHoliday = await ukBankHolidays('27-08-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not a scottish, english or welsh bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('england-and-wales and northern-ireland', () => {

        before(() => {
            countries =  ['england-and-wales', 'northern-ireland'];
        });

        it('returns true when date is a northern-irish bank holiday but not english or welsh', async function() {
            const isBankHoliday = await ukBankHolidays('12-07-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not a northern-irish, english or welsh bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('northern-ireland and scotland', () => {

        before(() => {
            countries =  ['northern-ireland', 'scotland'];
        });

        it('returns true when date is a scottish bank holiday but not northern-irish', async function() {
            const isBankHoliday = await ukBankHolidays('30-11-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns true when date is a northern-irish bank holiday but not scottish', async function() {
            const isBankHoliday = await ukBankHolidays('12-07-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not a scottish or northern-irish bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('england-and-wales, northern-ireland and scotland', () => {

        before(() => {
            countries =  ['england-and-wales', 'northern-ireland', 'scotland'];
        });

        it('returns true when date is a scottish bank holiday but not english, welsh, northern-irish', async function() {
            const isBankHoliday = await ukBankHolidays('30-11-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns true when date is a northern-irish bank holiday but not english, welsh or scottish', async function() {
            const isBankHoliday = await ukBankHolidays('12-07-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns true when date is an english, welsh and northern-irish bank holiday but not scottish', async function() {
            const isBankHoliday = await ukBankHolidays('27-08-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('returns false when date is not an english, welsh, scottish or northern-irish bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('date as a string', () => {

        before(() => {
            countries =  ['england-and-wales', 'northern-ireland', 'scotland'];
        });

        it('should return true when date is as a string and a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('25-12-2018', countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('should return false when date is as a string and not a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays('21-03-2018', countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('date as a moment', () => {

        before(() => {
            countries =  ['england-and-wales', 'northern-ireland', 'scotland'];
        });

        it('should return true when date is as a moment and a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays(moment('25-12-2018', 'DD-MM-YYYY'), countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('should return true when date is as a moment in a different format and a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays(moment('2018-12-25', 'YYYY-MM-DD'), countries);
            expect(isBankHoliday).to.equal(true);
        });

        it('should return false when date is as a moment and not a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays(moment('21-03-2018', 'DD-MM-YYYY'), countries);
            expect(isBankHoliday).to.equal(false);
        });

        it('should return false when date is as moment in a different format and not a bank holiday', async function() {
            const isBankHoliday = await ukBankHolidays(moment('2018-03-21', 'YYYY-MM-DD'), countries);
            expect(isBankHoliday).to.equal(false);
        });

    });

    describe('errors', () => {

        it('should throw an error if no arguments passed', async function() {
            await ukBankHolidays().should.be.rejectedWith('No arguments passed');
        });

        it('should throw an error if countries not passed', async function() {
            await ukBankHolidays('24-12-2018').should.be.rejectedWith('Countries not passed');
        });

        it('should throw an error if invalid country passed', async function() {
            await ukBankHolidays('24-12-2018', ['invalidCountry']).should.be.rejectedWith('Country not on the list');
        });

        it('should throw an error if countries is not an array', async function() {
            await ukBankHolidays('24-12-2018', 'england-and-wales').should.be.rejectedWith('Countries must be an array');
        });

        it('should throw an error if date is an empty string', async function() {
            await ukBankHolidays('', 'england-and-wales').should.be.rejectedWith('Date is an incorrect format. Must be in DD-MM-YYYY format');
        });

        it('should throw an error if date is not correct format', async function() {
            await ukBankHolidays('24-12-18', 'england-and-wales').should.be.rejectedWith('Date is an incorrect format. Must be in DD-MM-YYYY format');
        });

        it('should throw an error if moment date is not valid', async function() {
            await ukBankHolidays(moment('30-02-2018', 'DD-MM-YYYY'), 'england-and-wales').should.be.rejectedWith('Date passed is an invalid date');
        });

        it('should throw an error if string date is not valid', async function() {
            await ukBankHolidays('30-02-2018', 'england-and-wales').should.be.rejectedWith('Date passed is an invalid date');
        });

    });

});
