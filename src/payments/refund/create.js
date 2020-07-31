import { getClient } from "../../util/client";

const create = (paymentID, refundRequest) => {
  const client = getClient();
  return client.post(`/payment_sessions/${paymentID}/refund`, refundRequest);
};

export default create;
