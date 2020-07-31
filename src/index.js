// Setup
import { bootstrapClient } from "./util/client";
import keysValidator from "./validators/keys";
// Payments
import create from "./payments/create";
import read from "./payments/read";
import del from "./payments/delete";
// Batch Payments
import createBatch from "./payments/batch/create";
import readBatch from "./payments/batch/read";
// Webhooks
import validate from "./webhooks/validate";
import createWebhook from "./webhooks/create";
import listWebhooks from "./webhooks/list";
import deleteWebhook from "./webhooks/delete";

// Providers
import listProviders from "./providers/list";
// Bank Accounts
import listBankAccounts from "./bank_accounts/list";
import listTransactions from "./bank_accounts/transactions/list";

class Banked {
  constructor(keys = {}) {
    const k = keysValidator(keys);
    if (k.error) {
      throw new Error(k.error);
    }
    bootstrapClient(k.value);
    this.payments = {
      create,
      read,
      delete: del,
      batch: {
        create: createBatch,
        read: readBatch
      }
    };
    this.webhooks = {
      create: createWebhook,
      delete: deleteWebhook,
      list: listWebhooks,
      validate
    };
    this.providers = {
      read: listProviders,
      list: listProviders
    };
    this.bankAccounts = {
      list: listBankAccounts,
      transactions: {
        list: listTransactions
      }
    };
  }
}

module.exports = Banked;
