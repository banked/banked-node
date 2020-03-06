import axios from "axios";
import bootstrapClient from "../../../src/util/client";

jest.mock("axios");

describe("Client", () => {
  it("should add an interceptor to axios for global auth", () => {
    expect.assertions(4);
    bootstrapClient({
      api_key: "foo",
      secret_key: "bar"
    });
    expect(axios.interceptors.request.use.mock.calls).toHaveLength(1);

    const interceptor = axios.interceptors.request.use.mock.calls[0][0]({});
    expect(typeof interceptor.auth).toBe("object");
    expect(interceptor.auth.username).toBe("foo");
    expect(interceptor.auth.password).toBe("bar");
  });
});
