import { getClient } from "../util/client";
import paymentIDValidator from "../validators/payment-id";

const del = (paymentID = "") => {
  const client = getClient();
  const { value, error } = paymentIDValidator(paymentID);
  if (error) {
    throw new Error(error);
  }
  return client.delete(`/payment_sessions/${value}`);
};

export default del;
