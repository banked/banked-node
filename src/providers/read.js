import { getClient } from "../util/client";

const read = () => {
  const client = getClient();
  return client.get(`/providers`);
};

export default read;
