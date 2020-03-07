import { getClient } from "../util/client";
import paymentRequestValidator from "../validators/payment-request";

const create = (paymentRequest = {}) => {
  const client = getClient();
  const { value, error } = paymentRequestValidator(paymentRequest);
  if (error) {
    throw new Error(error);
  }
  return client.post("/payment_sessions", value);
};

export default create;
