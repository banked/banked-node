import { getClient } from "../util/client";

const create = (paymentRequest) => {
  const client = getClient();
  return client.post("/payment_sessions", paymentRequest);
};

export default create;
