import { getClient } from "../util/client";

const list = () => {
  const client = getClient();
  return client.get(`/webhooks`);
};

export default list;
