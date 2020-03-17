import axios from "axios";
import { bootstrapClient } from "../../../../src/util/client";
import read from "../../../../src/payments/batch/read";

jest.mock("axios");

describe("readBatchPayment", () => {
  let getMock;

  beforeAll(() => {
    getMock = jest.fn().mockResolvedValue({
      data: {
        foo: "bar"
      }
    });
    axios.create.mockImplementation(() => {
      return {
        interceptors: {
          request: {
            use: jest.fn()
          }
        },
        get: getMock
      };
    });
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
  });

  it("should return a function", () => {
    expect.assertions(1);
    expect(typeof read).toBe("function");
  });

  it("should send the request correctly", async () => {
    expect.assertions(3);
    const res = await read("70f7a5e9-cca0-4147-8a6a-10c598dc0aeb");
    expect(res.data.foo).toBe("bar");
    expect(getMock.mock.calls).toHaveLength(1);
    expect(getMock.mock.calls[0][0]).toBe(
      "/batch_payment_sessions/70f7a5e9-cca0-4147-8a6a-10c598dc0aeb"
    );
  });
});
