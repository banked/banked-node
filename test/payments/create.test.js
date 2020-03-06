import axios from "axios";
import create from "../../src/payments/create";

jest.mock("axios");

const getPaymentRequest = () => {
  const validPR = {
    reference: "Banked NodeSDK",
    success_url: "https://example.com/success",
    error_url: "https://example.com/error",
    line_items: [
      {
        name: "A line item name",
        amount: 1267,
        currency: "GBP",
        description: "A line item description",
        quantity: 1
      },
      {
        name: "A second line item name",
        amount: 12267,
        currency: "GBP",
        description: "A second line item description",
        quantity: 2
      }
    ],
    payee: {
      name: "Example Ltd.",
      account_number: "00000000",
      sort_code: "000000"
    }
  };
  return { ...validPR };
};

describe("createPayment", () => {
  it("should return a function", () => {
    expect.assertions(1);
    expect(typeof create).toBe("function");
  });

  describe("should validate the paymentRequest", () => {
    it("and throw if no paymentRequest is present", () => {
      expect.assertions(1);
      expect(() => {
        create();
      }).toThrow();
    });

    describe("and reference", () => {
      it("is required", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          delete pr.reference;
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "reference" is required'
          );
        }
      });

      it("length must be <18", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.reference = "A really long reference to pass in";
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "reference" length must be less than or equal to 18 characters long'
          );
        }
      });
    });

    describe("and success url", () => {
      it("is required", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          delete pr.success_url;
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "success_url" is required'
          );
        }
      });

      it("must be a valid URI", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.success_url = "Not a URI";
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "success_url" must be a valid uri'
          );
        }
      });

      it("must not be a relative path", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.success_url = "/a/relative/path";
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "success_url" must be a valid uri'
          );
        }
      });
    });

    describe("and error url", () => {
      it("is required", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          delete pr.error_url;
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "error_url" is required'
          );
        }
      });

      it("must be a valid URI", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.error_url = "Not a URI";
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "error_url" must be a valid uri'
          );
        }
      });

      it("must not be a relative path", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.error_url = "/a/relative/path";
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "error_url" must be a valid uri'
          );
        }
      });
    });

    describe("and line items", () => {
      it("are required", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          delete pr.line_items;
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "line_items" is required'
          );
        }
      });

      it("cannot be an empty array", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.line_items = [];
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "line_items" must contain at least 1 items'
          );
        }
      });

      it("cannot be an empty array", () => {
        expect.assertions(2);
        try {
          const pr = getPaymentRequest();
          pr.line_items = [];
          create(pr);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty(
            "message",
            'ValidationError: "line_items" must contain at least 1 items'
          );
        }
      });

      describe("must contain", () => {
        it("a name", () => {
          expect.assertions(2);
          try {
            const pr = getPaymentRequest();
            delete pr.line_items[0].name;
            delete pr.line_items[1].name;
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "line_items[0].name" is required. "line_items[1].name" is required'
            );
          }
        });

        describe("an amount", () => {
          it("which is required", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              delete pr.line_items[0].amount;
              delete pr.line_items[1].amount;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].amount" is required. "line_items[1].amount" is required'
              );
            }
          });

          it("which must be an number", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].amount = "234";
              pr.line_items[1].amount = "346";
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].amount" must be a number. "line_items[1].amount" must be a number'
              );
            }
          });

          it("which must be an integer", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].amount = 234.34;
              pr.line_items[1].amount = 346.67;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].amount" must be an integer. "line_items[1].amount" must be an integer'
              );
            }
          });

          it("which must be a positive number", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].amount = 0;
              pr.line_items[1].amount = -1;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].amount" must be a positive number. "line_items[1].amount" must be a positive number'
              );
            }
          });
        });

        describe("a currency", () => {
          it("which is required", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              delete pr.line_items[0].currency;
              delete pr.line_items[1].currency;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].currency" is required. "line_items[1].currency" is required'
              );
            }
          });

          it("must be a valid value", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].currency = "CNY";
              pr.line_items[1].currency = "USD";
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].currency" must be one of [GBP, EUR]. "line_items[1].currency" must be one of [GBP, EUR]'
              );
            }
          });
        });

        describe("a quantity", () => {
          it("which is required", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              delete pr.line_items[0].quantity;
              delete pr.line_items[1].quantity;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].quantity" is required. "line_items[1].quantity" is required'
              );
            }
          });

          it("which must be an number", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].quantity = "234";
              pr.line_items[1].quantity = "346";
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].quantity" must be a number. "line_items[1].quantity" must be a number'
              );
            }
          });

          it("which must be an integer", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].quantity = 234.34;
              pr.line_items[1].quantity = 346.67;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].quantity" must be an integer. "line_items[1].quantity" must be an integer'
              );
            }
          });

          it("which must be a positive number", () => {
            expect.assertions(2);
            try {
              const pr = getPaymentRequest();
              pr.line_items[0].quantity = 0;
              pr.line_items[1].quantity = -1;
              create(pr);
            } catch (error) {
              expect(error).toBeInstanceOf(Error);
              expect(error).toHaveProperty(
                "message",
                'ValidationError: "line_items[0].quantity" must be a positive number. "line_items[1].quantity" must be a positive number'
              );
            }
          });
        });
      });
    });

    describe("and payee", () => {
      describe("must contain an account numnber", () => {
        it("must be present", () => {
          expect.assertions(2);
          try {
            const pr = getPaymentRequest();
            delete pr.payee.account_number;
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.account_number" is required'
            );
          }
        });

        it("must be 8 length", () => {
          expect.assertions(4);
          try {
            const pr = getPaymentRequest();
            pr.payee.account_number = "000000";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.account_number" length must be 8 characters long'
            );
          }
          try {
            const pr = getPaymentRequest();
            pr.payee.account_number = "0000000000";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.account_number" length must be 8 characters long'
            );
          }
        });

        it("must be only numbers in the string", () => {
          expect.assertions(2);
          try {
            const pr = getPaymentRequest();
            pr.payee.account_number = "776shf45";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.account_number" with value "776shf45" fails to match the required pattern: /^\\d+$/'
            );
          }
        });
      });

      describe("must contain a sort code", () => {
        it("must be present", () => {
          expect.assertions(2);
          try {
            const pr = getPaymentRequest();
            delete pr.payee.sort_code;
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.sort_code" is required'
            );
          }
        });

        it("must be 6 length", () => {
          expect.assertions(4);
          try {
            const pr = getPaymentRequest();
            pr.payee.sort_code = "0000";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.sort_code" length must be 6 characters long'
            );
          }
          try {
            const pr = getPaymentRequest();
            pr.payee.sort_code = "00000000";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.sort_code" length must be 6 characters long'
            );
          }
        });

        it("must be only numbers in the string", () => {
          expect.assertions(2);
          try {
            const pr = getPaymentRequest();
            pr.payee.sort_code = "00-000";
            create(pr);
          } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty(
              "message",
              'ValidationError: "payee.sort_code" with value "00-000" fails to match the required pattern: /^\\d+$/'
            );
          }
        });
      });
    });
  });

  it("should send the request correctly", async () => {
    expect.assertions(4);
    axios.post.mockResolvedValue({
      data: {
        url: "https://example.com/checkout/"
      }
    });
    const res = await create(getPaymentRequest());
    expect(res.data.url).toBe("https://example.com/checkout/");
    expect(axios.post.mock.calls).toHaveLength(1);
    expect(axios.post.mock.calls[0][0]).toBe(
      "https://banked.me/api/v2/payment_sessions"
    );
    expect(axios.post.mock.calls[0][1]).toEqual(getPaymentRequest());
  });
});
