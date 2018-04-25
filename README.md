# UK Bank holidays
This module checks whether a date is a UK bank holiday or not.

## Usage

Add the module to your package.json:

```$js
yarn add @hmcts/uk-bank-holidays
```

Then, require the module in your code:

```javascript
const UkBankHolidays = require('@hmcts/uk-bank-holidays');


// instantiate the class and pass the countries you want the bank holiday dates for.
const ukbankholidays = new UkBankHolidays(['england-and-wales']);


// call this async function and pass an error callback. This gets the dates of bank holidays and caches it.
await ukbankholidays.loadBankHolidayDates(error => {
    // handle the error
});


// Then call this function and pass the date that you want to check. It return a boolean depending on whether it's a bank holiday or not
const isDateABankHoliday = ukbankholidays.isDateABankHoliday('25-12-2018'); // returns true;
```

The countries that you pass when instantiating the class must be an array. For example, if you want
to check the date against the Scottish bank holiday dates then you can specify this but only passing `['scotland']`

There are only three options you can pass for the countries: `['england-and-wales', 'northern-ireland', 'scotland']`.

The date that you pass when checking if it's a bank holiday or not can either be a string or a moment. 
If you pass a string, it must be in the following format: `DD-MM-YYYY`.

## Caching

In order to prevent multiple calls to the bank holidays api (which can be time costly), 
the dates that come back in the response are cached. The default age of the caching is one week. However, you can change
this by setting an environment variable `UK_BANK_HOLIDAYS_CACHE_AGE`

