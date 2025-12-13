# Ria Software Engineer Intern - Coding Challenge

## Description of Project

This is the repository for the solution for the coding assessment for the 2025 Ria Software Engineer internship. The project consists of creating an app using Next.js that allows users to convert currencies and view the live exchange rates. The language used for the project is TypeScript. The project uses the Frankfurter API for fetching the currencies available and the live exchange rates of said currencies. 

For the first main component of the app, Currency Converter, the user is able to input an amount and select a currency they want to convert from and the currency they want to convert to. Pressing the convert button will show the converted amount and the exchange rate of the two currencies. The user is also able to interchange the 'from' and 'to' currencies. If the user had selected USD for the 'from' currency and EUR for the 'to' currency, pressing the change button will make it so the currencies swap places. 

The second component of the app is the Live Exchange Rates. This section shows the live exchange rates of 10 currencies for 1 base currency. Note that selecting a 'from' currency from the Currency Converter section will change the base currency, thus changing the exchange rates for the rest of the currencies. 

## Setup instructions

Install npm:

```bash
npm install
```
Run development server:

```bash
npm run dev
```

Open app:

http://localhost:3000/

## Innovation feature

The third feature is a feature that would make the app more useful for sending money internationally. The feature added is a Transfer fee Calculator. Sending money abroad requires for the sender to pay an extra fee. The fees involve transfer fees that are fixed or a percentage, exchange rate markups, and intermediary bank charges. This feature was implemented because the sender will always want to know how much more fees they have to pay and how much would the recipient receive before actually transfering the money. 

In this section the user is able to input an amount and will show the Flat fee, Percentage fee, FX rate after Markup, total transfer fee, and the amount the recipient gets (Note: the flat, percentage, and fxmarkup values are example values for this solution, they are not real values). This makes it easier for the user to check for the fees instead of having to search for them on an external source or having to consult them. 

## Use of AI

AI was used mainly for css stylings and div structures. It was also used for fixing errors for the functions and the visualization of the data and values.

## Assumptions and trade-offs

Some assumptions made were that the exchange rates are accurate and up to date and the flat, percentage and fxmarkup fees; 

Some trade-offs were: no authentication and not being able to actually transfer money.

## Improvement

With more time and resources, an improvement or feature would be to be able to transfer money to other users, it could not necessarily be real money but to be capable of sending an amount to another person, with the fees mentioned above and to verify if the correct amount was received by the receiving end. 





