import axios from "axios";
import { bootstrapClient } from "../../../../src/util/client";
import create from "../../../../src/payments/batch/create";

jest.mock("axios");

const getBatchPaymentRequest = () => {
  const validPR = {
    success_url: "https://example.com/success",
    error_url: "https://example.com/error",
    provider_id: "6978dbcf-3dbb-4c97-867e-ef0b58c9d15b",
    currency: "GBP",
    payees: [
      {
        name: "Payee Ltd.",
        account_number: "00000000",
        sort_code: "000000",
        reference: "Reference",
        amount: 1267,
        client_id: "247072a7-8c16-47a5-8c97-b4aa357a2113"
      },
      {
        name: "Another Payee Ltd.",
        account_number: "00000000",
        sort_code: "000000",
        reference: "Reference",
        amount: 3367,
        client_id: "bb494a8f-97b9-432f-91ae-6655f84ab97a"
      }
    ]
  };
  return { ...validPR };
};

describe("createBatchPayment", () => {
  let postMock;

  beforeAll(() => {
    postMock = jest.fn().mockResolvedValue({
      data: {
        url: "https://example.com/batch-checkout/"
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
    const res = await create(getBatchPaymentRequest());
    expect(res.data.url).toBe("https://example.com/batch-checkout/");
    expect(postMock.mock.calls).toHaveLength(1);
    expect(postMock.mock.calls[0][0]).toBe("/batch_payment_sessions");
    expect(postMock.mock.calls[0][1]).toEqual(getBatchPaymentRequest());
  });
});
