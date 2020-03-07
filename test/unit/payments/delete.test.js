import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import del from "../../../src/payments/delete";

jest.mock("axios");

describe("deletePayment", () => {
  let deleteMock;

  beforeAll(() => {
    deleteMock = jest.fn();
    axios.create.mockImplementation(() => {
      return {
        interceptors: {
          request: {
            use: jest.fn()
          }
        },
        delete: deleteMock
      };
    });
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
  });

  it("should return a function", () => {
    expect.assertions(1);
    expect(typeof del).toBe("function");
  });

  it("should require a paymentID", () => {
    expect.assertions(2);
    try {
      del();
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
      del("something not a GUID");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "value" must be a valid GUID'
      );
    }
  });

  it("should send the request correctly", async () => {
    expect.assertions(2);
    await del("70f7a5e9-cca0-4147-8a6a-10c598dc0aeb");
    expect(deleteMock.mock.calls).toHaveLength(1);
    expect(deleteMock.mock.calls[0][0]).toBe(
      "/payment_sessions/70f7a5e9-cca0-4147-8a6a-10c598dc0aeb"
    );
  });
});
