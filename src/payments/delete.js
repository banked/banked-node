import { getClient } from "../util/client";

const del = (paymentID) => {
  const client = getClient();
  return client.delete(`/payment_sessions/${paymentID}`);
};

export default del;
