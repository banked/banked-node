const axios = require("axios");
const { bootstrapClient } = require("../../src/util/client");
const Banked = require("../../dist");

jest.mock("axios");

let postMock;

beforeAll(() => {
  postMock = jest.fn().mockResolvedValue({
    data: {
      url: "https://example.com/checkout/"
    }
  });
  axios.create.mockImplementation(() => {
    return {
      interceptors: {
        request: {
          use: jest.fn()
        }
      },
      post: postMock
    };
  });
  bootstrapClient({
    api_key: "foo",
    secret_key: "bar"
  });
});

it("Banked should create a payment", async () => {
  expect.assertions(1);
  const banked = new Banked({
    api_key: "pk_9393844",
    secret_key: "sk_293r29ru"
  });
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
      },
      {
        name: "A second line item name",
        amount: 12267,
        currency: "GBP",
        description: "A second line item description",
        quantity: 2
      }
    ],
    payee: {
      name: "Example Ltd.",
      account_number: "00000000",
      sort_code: "000000"
    }
  });
  expect(payment.data.url).toBe("https://example.com/checkout/");
});
