import validate from "../../../src/webhooks/validate";
import buildWebhook from "../../helpers/webhook-fixture";

describe("validateWebhook", () => {
  it("should return a function", () => {
    expect.assertions(1);
    expect(typeof validate).toBe("function");
  });

  describe("should validate it's config object", () => {
    it("as required", () => {
      expect.assertions(2);
      try {
        validate();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "payload_header" is required. "payload" is required. "signature" is required'
        );
      }
    });
    it("payload_header must contain a period", () => {
      expect.assertions(2);
      try {
        const wh = buildWebhook();
        wh.payload_header = "daksjklsdj";
        validate(wh);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "payload_header" with value "daksjklsdj" fails to match the required pattern: /\\./'
        );
      }
    });

    it("signature must contain start and end if it's passed", () => {
      expect.assertions(2);
      try {
        const wh = buildWebhook();
        wh.time_range = {};
        validate(wh);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "time_range.start" is required. "time_range.end" is required'
        );
      }
    });

    it("signature must pass ISO dates as start and end", () => {
      expect.assertions(2);
      try {
        const wh = buildWebhook();
        wh.time_range.start = new Date().toString();
        wh.time_range.end = new Date().toString();
        validate(wh);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          "message",
          'ValidationError: "time_range.start" must be in iso format. "time_range.end" must be in iso format'
        );
      }
    });
  });

  it("should correctly verify a webhook", () => {
    const wh = buildWebhook();
    const res = validate(wh);
    expect(res.isValid).toBeTruthy();
  });

  it("should verify if between supplied dates", () => {
    const wh = buildWebhook();
    const res = validate(wh);
    expect(res.isWithinRange).toBeTruthy();
  });

  it("should not include isWithinRange if no time_range is present", () => {
    const wh = buildWebhook();
    delete wh.time_range;
    const res = validate(wh);
    expect(res.isWithinRange).toBeUndefined();
  });
});
