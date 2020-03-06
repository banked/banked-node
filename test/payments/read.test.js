import axios from "axios";
import read from "../../src/payments/read";

jest.mock("axios");

describe("readPayment", () => {
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
    axios.get.mockResolvedValue({
      data: {
        foo: "bar"
      }
    });
    const res = await read("70f7a5e9-cca0-4147-8a6a-10c598dc0aeb");
    expect(res.data.foo).toBe("bar");
    expect(axios.get.mock.calls).toHaveLength(1);
    expect(axios.get.mock.calls[0][0]).toBe(
      "https://banked.me/api/v2/payment_sessions/70f7a5e9-cca0-4147-8a6a-10c598dc0aeb"
    );
  });
});
