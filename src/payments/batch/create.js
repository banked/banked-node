import { getClient } from "../../util/client";

const create = batchPaymentRequest => {
  const client = getClient();
  return client.post("/batch_payment_sessions", batchPaymentRequest);
};

export default create;
