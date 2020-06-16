import { getClient } from "../util/client";

const list = () => {
  const client = getClient();
  return client.get(`/providers`);
};

export default list;
