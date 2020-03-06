import crypto from "crypto";
import isWithinInterval from "date-fns/isWithinInterval";
import webhookValidator from "../validators/webhook";

const validate = (config = {}) => {
  const { value, error } = webhookValidator(config);
  if (error) {
    throw new Error(error);
  }
  const raw = value.payload_header.split(".");
  const payloadTimestamp = raw[0];
  const payloadSignature = raw[1];
  const toBeSigned = `${payloadTimestamp}.${value.payload}`;
  const hmac = crypto.createHmac("sha256", value.signature).update(toBeSigned);
  const digest = hmac.digest("hex");
  const result = {
    isValid: digest === payloadSignature,
    localHash: digest,
    payloadHash: payloadSignature
  };
  if (value.time_range) {
    const d = parseInt(payloadTimestamp, 10) * 1000;
    result.isWithinRange = isWithinInterval(new Date(d), {
      start: new Date(value.time_range.start),
      end: new Date(value.time_range.end)
    });
  }
  return result;
};

export default validate;
