import { getClient } from "../../util/client";

const read = paymentID => {
  const client = getClient();
  return client.get(`/batch_payment_sessions/${paymentID}`);
};

export default read;
