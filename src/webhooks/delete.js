import { getClient } from "../util/client";

const del = webhookID => {
  const client = getClient();
  return client.delete(`/webhooks/${webhookID}`);
};

export default del;
