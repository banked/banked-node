import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import read from "../../../src/bank_accounts/list";

jest.mock("axios");

describe("listBankAccounts", () => {
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
    const res = await read();
    expect(res.data.foo).toBe("bar");
    expect(getMock.mock.calls).toHaveLength(1);
    expect(getMock.mock.calls[0][0]).toBe("/bank_accounts/");
  });
});
