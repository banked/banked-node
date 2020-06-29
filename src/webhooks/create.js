import { getClient } from "../util/client";

const create = webhookRequest => {
  const client = getClient();
  return client.post("/webhooks", webhookRequest);
};

export default create;
