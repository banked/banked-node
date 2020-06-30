import axios from "axios";
import { bootstrapClient } from "../../../src/util/client";
import create from "../../../src/webhooks/create";

jest.mock("axios");

const getWebhookRequest = () => {
  const validWebhook = {
    target_url: "https://example.banked.com",
    events: ["payment_sent"]
  };
  return { ...validWebhook };
};

describe("createWebhook", () => {
  let postMock;

  beforeAll(() => {
    postMock = jest.fn().mockResolvedValue({
      data: {
        target_url: "https://example.banked.com"
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
    const res = await create(getWebhookRequest());
    expect(res.data.target_url).toBe("https://example.banked.com");
    expect(postMock.mock.calls).toHaveLength(1);
    expect(postMock.mock.calls[0][0]).toBe("/webhooks");
    expect(postMock.mock.calls[0][1]).toEqual(getWebhookRequest());
  });
});
