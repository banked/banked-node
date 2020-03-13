import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import create from "../../../src/payments/create";

jest.mock("axios");

const getPaymentRequest = () => {
  return {
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
  };
};

describe("createPayment", () => {
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

  it("should return a function", () => {
    expect.assertions(1);
    expect(typeof create).toBe("function");
  });

  it("should send the request correctly", async () => {
    expect.assertions(4);
    const res = await create(getPaymentRequest());
    expect(res.data.url).toBe("https://example.com/checkout/");
    expect(postMock.mock.calls).toHaveLength(1);
    expect(postMock.mock.calls[0][0]).toBe("/payment_sessions");
    expect(postMock.mock.calls[0][1]).toEqual(getPaymentRequest());
  });
});
