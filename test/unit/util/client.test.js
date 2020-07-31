import axios from "axios";
import { bootstrapClient, getClient } from "../../../src/util/client";

jest.mock("axios");

describe("Client", () => {
  let useMock;

  beforeEach(() => {
    useMock = jest.fn();
    axios.create.mockImplementation(() => {
      return {
        interceptors: {
          request: {
            use: useMock
          }
        }
      };
    });
  });

  it("should create an instance of axios with the correct config", () => {
    expect.assertions(3);
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
    expect(axios.create.mock.calls).toHaveLength(1);

    const createConfig = axios.create.mock.calls[0][0];
    expect(createConfig.baseURL).toBe("https://api.banked.com/v2");
    expect(createConfig.timeout).toBe(3000);
  });

  it("should add an interceptor to axios for oauth auth", () => {
    expect.assertions(2);
    bootstrapClient({
      access_token: "123"
    });
    expect(useMock.mock.calls).toHaveLength(1);

    const interceptor = useMock.mock.calls[0][0]({ headers: {} });
    expect(interceptor.headers.Authorization).toBe("Bearer 123");
  });

  it("should add an interceptor to axios for global auth", () => {
    expect.assertions(4);
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
    expect(useMock.mock.calls).toHaveLength(1);

    const interceptor = useMock.mock.calls[0][0]({});
    expect(typeof interceptor.auth).toBe("object");
    expect(interceptor.auth.username).toBe("foo");
    expect(interceptor.auth.password).toBe("bar");
  });

  it("should return an axios instance on getClient", () => {
    expect.assertions(1);
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
    expect(getClient().interceptors).toBeTruthy();
  });
});
