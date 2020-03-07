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

  describe("should validate its key config", () => {
    it("should throw if keys set with an empty object", () => {
      expect.assertions(2);
      try {
        new Banked();
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
        new Banked({
          api_key: "pk_9393844"
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "secret_key" is required'
        );
      }
      try {
        new Banked({
          secret_key: "sk_9393844"
        });
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
        new Banked({
          api_key: "does not start with pk_",
          secret_key: "does not start with sk_"
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "api_key" with value "does not start with pk_" fails to match the required pattern: /^pk_/i. "secret_key" with value "does not start with sk_" fails to match the required pattern: /^sk_/i'
        );
      }
    });
  });

  describe("should validate its requestConfig, if present", () => {
    describe("timeouts", () => {
      it("should throw if not a number", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              timeout: "1000"
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "timeout" must be a number'
          );
        }
      });
      it("should be >0", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              timeout: 0
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "timeout" must be a positive number'
          );
        }
      });
    });
    describe("maxNetworkRetries", () => {
      it("should throw if not a number", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              maxNetworkRetries: "5"
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "maxNetworkRetries" must be a number'
          );
        }
      });
      it("should be >0", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              maxNetworkRetries: 0
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "maxNetworkRetries" must be a positive number'
          );
        }
      });
    });
    describe("proxy", () => {
      it("should throw if proxy.host not present", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                port: 9000,
                auth: {
                  username: 'mikeymike',
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.host\" is required'
          );
        }
      });
      it("should throw if proxy.host not an IP", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: 'not an ip',
                port: 9000,
                auth: {
                  username: 'mikeymike',
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.host\" must be a valid ip address of one of the following versions [ipv4, ipv6] with a optional CIDR'
          );
        }
      });
      it("should throw if proxy.port not present", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: '127.0.0.1',
                auth: {
                  username: 'mikeymike',
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.port\" is required'
          );
        }
      });
      it("should throw if proxy.port not a number", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: '127.0.0.1',
                port: '394',
                auth: {
                  username: 'mikeymike',
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.port\" must be a number'
          );
        }
      });
      it("should throw if proxy.port not a valid port", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: '127.0.0.1',
                port: 222222222222,
                auth: {
                  username: 'mikeymike',
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.port\" must be a valid port'
          );
        }
      });

      it("should throw if proxy.auth.username is not passed", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: '127.0.0.1',
                port: 80,
                auth: {
                  password: 'rapunz3l'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.auth.username\" is required'
          );
        }
      });

      it("should throw if proxy.auth.password is not passed", () => {
        expect.assertions(2);
        try {
          new Banked(
            {
              api_key: "pk_9393844",
              secret_key: "sk_293r29ru"
            },
            {
              proxy: {
                host: '127.0.0.1',
                port: 80,
                auth: {
                  username: 'someusername'
                }
              }
            }
          );
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "proxy.auth.password\" is required'
          );
        }
      });
    });
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
