import Config from "../../../src/util/config";

describe("Config", () => {
  let config;

  beforeEach(() => {
    config = new Config();
  });

  it("should throw if keys set with an empty object", () => {
    expect.assertions(2);
    try {
      config.keys = {};
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "api_key" is required. "secret_key" is required'
      );
    }
  });

  it("should throw if keys set with only one valid key", () => {
    expect.assertions(4);
    try {
      config.keys = {
        api_key: "pk_9393844"
      };
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "secret_key" is required'
      );
    }
    try {
      config.keys = {
        secret_key: "sk_9393844"
      };
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "api_key" is required'
      );
    }
  });

  it("should throw if keys set in the wrong format", () => {
    expect.assertions(2);
    try {
      config.keys = {
        api_key: "does not start with pk_",
        secret_key: "does not start with sk_"
      };
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'ValidationError: "api_key" with value "does not start with pk_" fails to match the required pattern: /^pk_/i. "secret_key" with value "does not start with sk_" fails to match the required pattern: /^sk_/i'
      );
    }
  });

  it("should return keys once set", () => {
    expect.assertions(2);
    expect(config.keys).toBeNull();
    config.keys = {
      api_key: "pk_9393844",
      secret_key: "sk_293r29ru"
    };
    expect(config.keys).toEqual({
      api_key: "pk_9393844",
      secret_key: "sk_293r29ru"
    });
  });
});
