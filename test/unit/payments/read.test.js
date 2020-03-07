import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import read from "../../../src/payments/read";

jest.mock("axios");

describe("readPayment", () => {
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

  it("should require a paymentID", () => {
    expect.assertions(2);
    try {
      read();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "value" is not allowed to be empty'
      );
    }
  });

  it("should require a valid GUID as a paymentID", () => {
    expect.assertions(2);
    try {
      read("something not a GUID");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "value" must be a valid GUID'
      );
    }
  });

  it("should send the request correctly", async () => {
    expect.assertions(3);
    const res = await read("70f7a5e9-cca0-4147-8a6a-10c598dc0aeb");
    expect(res.data.foo).toBe("bar");
    expect(getMock.mock.calls).toHaveLength(1);
    expect(getMock.mock.calls[0][0]).toBe(
      "/payment_sessions/70f7a5e9-cca0-4147-8a6a-10c598dc0aeb"
    );
  });
});
