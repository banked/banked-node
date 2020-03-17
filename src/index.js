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
      validate
    };
  }
}

module.exports = Banked;
