import axios from "axios";
import { bootstrapClient } from "../../../../src/util/client";
import create from "../../../../src/payments/refund/create";

jest.mock("axios");

describe("createRefund", () => {
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
    expect.assertions(3);
    const res = await create("123", "foo");
    expect(res.data.url).toBe("https://example.com/checkout/");
    expect(postMock.mock.calls).toHaveLength(1);
    expect(postMock.mock.calls[0][0]).toBe("/payment_sessions/123/refund");
  });
});
