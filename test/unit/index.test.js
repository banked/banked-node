import Banked from "../../src/index";

describe("Banked", () => {
  it("should expose an instantiatable function", () => {
    expect.assertions(1);
    expect(typeof Banked).toBe("function");
  });

  it("should require the correct keys object to be passed on initialisation", () => {
    expect.assertions(1);
    expect(() => {
      new Banked({
        api_key: "pk_9393844",
        secret_key: "sk_293r29ru"
      });
    }).not.toThrow();
  });

  it("should instantiate Config", () => {
    expect.assertions(1);
    const banked = new Banked({
      api_key: "pk_9393844",
      secret_key: "sk_293r29ru"
    });
    expect(banked.__config.keys).toEqual({
      api_key: "pk_9393844",
      secret_key: "sk_293r29ru"
    });
  });

  it("should throw if no config is provided", () => {
    expect.assertions(1);
    expect(() => {
      new Banked();
    }).toThrow();
  });

  describe("should expose a public api with", () => {
    let banked;

    beforeEach(() => {
      banked = new Banked({
        api_key: "pk_9393844",
        secret_key: "sk_293r29ru"
      });
    });

    it("a payments object", () => {
      expect.assertions(1);
      expect(typeof banked.payments).toBe("object");
    });

    it("payment methods", () => {
      expect.assertions(4);
      expect(Object.keys(banked.payments).length).toBe(3);
      expect(typeof banked.payments.create).toBe("function");
      expect(typeof banked.payments.read).toBe("function");
      expect(typeof banked.payments.delete).toBe("function");
    });

    it("a webhooks object", () => {
      expect.assertions(1);
      expect(typeof banked.webhooks).toBe("object");
    });

    it("payment methods", () => {
      expect.assertions(2);
      expect(Object.keys(banked.webhooks).length).toBe(1);
      expect(typeof banked.webhooks.validate).toBe("function");
    });
  });
});
