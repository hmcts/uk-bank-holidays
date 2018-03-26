# UK Bank holidays
This module checks whether a date is a UK bank holiday or not.

## Usage

Add the module to your package.json:

```$js
yarn add @hmcts/uk-bank-holidays
```

Then, require the module in your code:

```javascript
const ukBankHolidays = require('@hmcts/uk-bank-holidays');
```

`ukBankHolidays` is an async function which takes two arguments: `date`, `countries` and returns a boolean. 

`date`: This is the date that you want to check if it's a bank holiday or not.
The date can either be passed as a string or a moment. If you pass a string, it must be in the following format: `DD-MM-YYYY`.

`countries`: The countries is the UK country/countries you want to check the date against for bank holidays. This must be passed as an array. For example, if you want
to check the date against the Scottish bank holiday dates then you can specify this but only passing `['scotland']`.

There are only three options you can pass for the countries: `['england-and-wales', 'northern-ireland', 'scotland']`.

```javascript

// as it is an sync function you must put 'await' before calling it.

const isDateABankHoliday = await ukBankHolidays('25-12-2018', ['england-and-wales', 'northern-ireland', 'scotland']); // returns true;
```
