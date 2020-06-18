# banked-node

[![Version](https://img.shields.io/npm/v/@banked/node)](https://www.npmjs.com/package/@banked/node)
[![Build Status](https://img.shields.io/github/workflow/status/banked/banked-node/ci)](https://github.com/banked/banked-node/actions)

The Banked Node library provides convenient access to the Banked API from applications written in server-side JavaScript.

## Installation

Install the package with

```
npm install @banked/node
# or
yarn add @banked/node
```

## Usage

The package needs to be configured with your account's API and secret keys, these are available [Banked's console](https://console.banked.com).

```javascript
const Banked = require('@banked/node');
const banked = new Banked({
  api_key: 'Your API key',
  secret_key: 'Your secret key'
});
```

All of node libraries public methods throw with a `ValidationError` when called with incorrect arguments.

### Payments

The Banked Node library allows you to create, read and delete payments with the Banked API. All of the payment methods return a promise (sourced from the [axios](https://github.com/axios/axios) client).

See [Banked's Payment API docs](https://banked.com/developer-documentation/api/payments) for more information on request and response formats.

```javascript
const Banked = require('@banked/node');
const banked = new Banked({
  api_key: 'Your API key',
  secret_key: 'Your secret key'
});

// 1. Create a payment
const payment = await banked.payments.create({
  reference: "Banked NodeSDK",
  success_url: "https://example.com/success",
  error_url: "https://example.com/error",
  line_items: [
    {
      name: "A line item name",
      amount: 1267,
      currency: "GBP",
      description: "A line item description",
      quantity: 1
    }
  ],
  payee: {
    name: "Example Ltd.",
    account_number: "00000000",
    sort_code: "000000"
  }
});

// 2. Read a payment
const payment = await banked.payments.read('1ae1ce03-dfa9-4593-b487-65c656991cb5');

// 3. Delete a payment
const response = await banked.payments.delete('1ae1ce03-dfa9-4593-b487-65c656991cb5');

```

Banked's payments returns a [`paymentSession`](https://banked.com/developer-documentation/api/payments) object when created and read.

### Webhooks

The library also supports the verification of webhook signatures

```javascript
const Banked = require('@banked/node');
const banked = new Banked({
  api_key: 'Your API key',
  secret_key: 'Your secret key'
});

const verification = await banked.webhooks.validate({
  payload_header: '', // (String) The 'Banked-Signature' HTTP header from the webhook
  payload: '', // (String) The body of the webhook
  signature: '', // (String) The signature key you uploaded to the Banked console
  time_range: { // An optional key, which validates if the request was signed within a prescribed period
    start: '', // (String) An ISO date
    end: '' // (String) An ISO date
  }
});
// {
//  isValid: true/false,
//  isWithinRange: true/false // only returned if time_range is passed in
// }
```

### Bank Accounts

```javascript
const bankAccounts = await banked.bankAccounts.list();
````

## Development

### Commands

```sh
$ npm test # run tests with Jest
$ npm run coverage # run tests with coverage and open it on browser
$ npm run lint # lint code
$ npm run docs # generate docs
$ npm run build # generate docs and transpile code
```

### Publish

Run the following commands to release a new version to NPM.

```sh
$ npm run release
$ npm run publish
$ npm publish
```

It'll automatically run `test`, `lint`, `docs`, `build`, generate `CHANGELOG.md`, and push commits and tags to the remote repository.

Currently [@Joe8Bit](https://github.com/joe8bit) and [@tomwaddington](https://github.com/tomwaddington) have release bits.

## License

MIT
