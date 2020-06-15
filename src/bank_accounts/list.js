import { getClient } from "../util/client";

const list = () => {
  const client = getClient();
  return client.get(`/bank_accounts/`);
};

export default list;
