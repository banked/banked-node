import { getClient } from "../util/client";

const read = paymentID => {
  const client = getClient();
  return client.get(`/payment_sessions/${paymentID}`);
};

export default read;
