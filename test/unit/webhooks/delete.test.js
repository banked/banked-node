import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import del from "../../../src/webhooks/delete";

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

  it("should send the request correctly", async () => {
    expect.assertions(2);
    await del("70f7a5e9-cca0-4147-8a6a-10c598dc0aeb");
    expect(deleteMock.mock.calls).toHaveLength(1);
    expect(deleteMock.mock.calls[0][0]).toBe(
      "/webhooks/70f7a5e9-cca0-4147-8a6a-10c598dc0aeb"
    );
  });
});
