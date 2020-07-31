import { getClient } from "../../util/client";

const list = accountInformation => {
  const client = getClient();
  return client.get(
    `/bank_accounts/${accountInformation.bankAccountID}/transactions?from_date=${accountInformation.fromDate}&to_date=${accountInformation.toDate}`
  );
};

export default list;
