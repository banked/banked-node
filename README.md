# banked-node

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

### Network configuration

Banked's Node library optionally takes a global network configuration object as it's second paramter. This implements: a custom timeout period; an automatic retry policy; and/or configures an HTTP proxy. 

```javascript
const Banked = require('@banked/node');
const banked = new Banked({
  api_key: 'Your API key',
  secret_key: 'Your secret key'
}, {
  timeout: 5000, // (optional) defaults to 3000
  maxNetworkRetries: 5, //(optional) defaults to 0,
  proxy: { // (optional, but contains required properties if configured)
    host: '127.0.0.1', // (required, string) a valid IPv4 or IPv6 string, with optional CIDR
    port: 8080, // (required, string) a valid port
    auth: { // (optional, but contains required properties if configured)
      username: 'frodobaggins', // (required, string)
      password: '4TheShire' // (required, string)
    }
  }
});
```

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

```sh
$ npm release
$ npm publish
```

It'll automatically run `test`, `lint`, `docs`, `build`, generate `CHANGELOG.md`, and push commits and tags to the remote repository.

## License

MIT 
