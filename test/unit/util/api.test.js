import { constructAPIURI } from "../../../src/util/api";

describe("API", () => {
  it("should construct the correct API path", () => {
    expect(constructAPIURI("/foo")).toBe("https://banked.me/api/v2/foo");
  });
});
